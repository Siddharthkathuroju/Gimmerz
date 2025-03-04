import { getServerSession } from "next-auth/next";
import { authOptions } from "/utils/authOptions";
import { connectoDB } from "/utils/database";
import Question from "/models/questions";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const POST = async (req, res) => {
  try {
    // Fetch the session using getServerSession
    const session = await getServerSession({req});
    const { question, userId } = await req.json();

    console.log("from_session "+ session?.user?.id);  

    if (!question || question.trim().length < 10) {
      return new Response(
        JSON.stringify({
          message: "Question must be at least 10 characters long",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await connectoDB();
    console.log("Connected to the database");

    // Save the question
    const newQuestion = new Question({
      question,
      user: userId,
    });

    await newQuestion.save();
    console.log("Question saved:", newQuestion);

    // Integrate Gemini API
    const apiKey = process.env.GEMINI_API_KEY; // Ensure the key is defined in .env
    if (!apiKey) {
      throw new Error("Gemini API key is not set in the environment variables.");
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 512,
      responseMimeType: 'text/plain',
    };

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(question);
    const generatedText = result.response.text();
    console.log("Generated text:", generatedText);

    // Return the saved question and generated text
    return new Response(
      JSON.stringify({
        savedQuestion: newQuestion,
        generatedContent: generatedText,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST API:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to process your question",
        error: error.message || error,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
