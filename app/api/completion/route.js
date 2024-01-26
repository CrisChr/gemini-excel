import { Configuration, OpenAIApi } from "openai-edge";
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";

// Set the runtime to edge
export const runtime = "edge";

// Create an OpenAI API client (that's edge friendly!)
const config = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req) {
  try {
    const { language, prompt } = await req.json();

    // Ask Google Generative AI for a streaming completion given the prompt
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: "user",
          content: `${prompt}. 
        ${process.env.LANGUAGE_TIP} ${language}. 
        ${process.env.THANK_YOU}`,
        },
      ],
    });

    console.log("response: ", response);

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

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
