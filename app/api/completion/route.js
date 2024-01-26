import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenerativeAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');

// Set the runtime to edge
export const runtime = "edge";

export async function POST(req) {
  try {
    const { language, prompt } = await req.json();

    // Ask Google Generative AI for a streaming completion given the prompt
    const response = await genAI
      .getGenerativeModal({model: 'gemini-pro'})
      .generateContentStream({
        contents:[{role: 'user', parts: [{text: `${prompt}. 
        ${process.env.LANGUAGE_TIP} ${language}. 
        ${process.env.THANK_YOU}`,}]}]
      })

    console.log("response: ", response);

    // Convert the response into a friendly text-stream
    const stream = GoogleGenerativeAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);

  } catch (error) {
    // Check if the error is an APIError
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({ name, status, headers, message }, { status });
    } else {
      throw error;
    }
  }
}
