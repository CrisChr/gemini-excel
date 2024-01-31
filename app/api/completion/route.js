import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

// Set the runtime to edge
export const runtime = "edge";

export async function POST(req) {
  const { language, prompt } = await req.json();

  // Ask Google Generative AI for a streaming completion given the prompt
  const response = await genAI
    .getGenerativeModel({ model: "gemini-pro" })
    .generateContentStream({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
                ${process.env.PREFIX_PROMPT}:
                ${prompt}. 
                ${process.env.LANGUAGE_TIP} ${language}. 
                ${process.env.USING_CONTENT_FORMATTING}. 
                ${process.env.THANK_YOU}
              `,
            },
          ],
        },
      ],
    });

  console.log("response: ", response);

  // Convert the response into a friendly text-stream
  const stream = GoogleGenerativeAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}

/**
 *
 */
