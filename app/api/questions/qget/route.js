import { getServerSession } from "next-auth/next";
import { authOptions } from "/utils/authOptions";
import { connectoDB } from "/utils/database";
import Question from "/models/questions";

export const GET = async (req) => {
  try {
    // Validate the session
    const session = await getServerSession({ req });
    console.log("from_session" + session._id)
    if (!session || !session.user) {
      return new Response(
        JSON.stringify({ message: "User not authenticated" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Connect to the database
    await connectoDB();
    console.log("Connected to api backened!!!")

    // Fetch only the questions belonging to the logged-in user
    const userId = session?.user?._id;
    console.log(userId);
    const questions = await Question.find({ user: userId });

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
