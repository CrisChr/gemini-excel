"use client";

import DropDown from "../../components/DropDown";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useCompletion } from 'ai/react';


export default function HomePage() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("English");
  const answerRef = useRef(null);

  const scrollToAnswer = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { complete, completion, isLoading, handleSubmit } = useCompletion({
    api: "/api/completion",
    body: {
      language,
      prompt: content,
    },
    onResponse: (res) => {
      if (res.status === 429) {
        toast.error("You are being rate limited. Please try again later.");
        return;
      }
      scrollToAnswer();
    },
  });

  const handleInputChange = useCallback(
    (e) => setContent(e.target.value),
    []
  );

  const onSubmit = (e) => {
    complete(content);
    handleSubmit(e);
  };

  const answer = completion;

  return (
    <>
      <h1 className="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900">
        Generate the Excel formulas by AI.
      </h1>

      <form className="max-w-xl w-full" onSubmit={onSubmit}>
        <div className="flex mt-10 items-center space-x-3">
          <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">
            Describe what Excel formulas you would like.
          </p>
        </div>
        <textarea
          value={content}
          onChange={handleInputChange}
          rows={4}
          className="w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-black focus:ring-black my-5 px-2 py-1"
          placeholder={"e.g. Identify gender based on ID card."}
        />
        <div className="flex mb-5 items-center space-x-3">
          <Image src="/2-black.png" width={30} height={30} alt="1 icon" />
          <p className="text-left font-medium">Select your language.</p>
        </div>
        <div className="block">
          <DropDown
            language={language}
            setLanguage={(newLanguage) => setLanguage(newLanguage)}
          />
        </div>

        <button
          className="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full mt-10"
          type="submit"
          disabled={isLoading}
          style={{
            cursor: isLoading ? "not-allowed" : "",
          }}
        >
          {isLoading ? (
            <span className="loading">
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
              <span style={{ backgroundColor: "white" }} />
            </span>
          ) : (
            <span>Generate Excel formulas &rarr;</span>
          )}
        </button>
      </form>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="h-px bg-gray-700 border-1" />
      <output className="space-y-10 my-10">
        {answer && (
          <>
            <div>
              <h2
                className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto"
                ref={answerRef}
              >
                The formula you need
              </h2>
            </div>
            <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
              <div
                className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                onClick={() => {
                  navigator.clipboard.writeText(answer);
                  toast("Copied", {
                    icon: "✂️",
                  });
                }}
              >
                <div className="whitespace-pre-wrap text-left">{answer}</div>
              </div>
            </div>
          </>
        )}
      </output>
    </>
  );
}
