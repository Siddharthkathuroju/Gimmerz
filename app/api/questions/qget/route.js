import { getServerSession } from "next-auth/next";
import { authOptions } from "/utils/authOptions";
import { connectoDB } from "/utils/database";
import Question from "/models/questions";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectoDB();
    console.log("api backened!")

    const session = await getServerSession({req});
    
    console.log({session});
    console.log("from_session" + session.user.id);
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ message: "User not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const questions = await Question.find({ user: session.user.id}).sort({
      createdAt: -1,
    });

    return new Response(
      JSON.stringify(questions),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching user questions:", error.message);
    return new Response(
      JSON.stringify({ message: "Failed to fetch questions" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
