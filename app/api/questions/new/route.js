import { getServerSession } from "next-auth/next";
import { authOptions } from "/utils/authOptions";
import { connectoDB } from "/utils/database";
import Question from "/models/questions";

export const POST = async (req,res) => {
  try {
    // Fetch the session using getServerSession
    const session = await getServerSession(req, res, authOptions);
    console.log(session?.user.id);
    if (!session?.user?.id) {
      return new Response(
        JSON.stringify({ message: "Not authorized" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Parse the request body
    const { question } = await req.json();

    if (!question || question.trim().length < 10) {
      return new Response(
        JSON.stringify({ message: "Question must be at least 10 characters long" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await connectoDB();

    // Save the question
    const newQuestion = new Question({
      question,
      user: session.user.id,
    });
    await newQuestion.save();

    return new Response(
      JSON.stringify(newQuestion),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in POST API:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process your question" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
