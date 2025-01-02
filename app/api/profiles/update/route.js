import { getServerSession } from "next-auth/next";
import { connectoDB } from "/utils/database"; // Your dbConnect utility
import Profile from "/models/profile"; // Your Mongoose model
import { NextRequest, NextResponse } from "next/server";

// Connect to DB for the first time
async function connectToDatabase() {
  await connectoDB();
}

// POST method to update or create profile
export async function POST(req, res) {
  console.log("API backend hit");
  
  // Connect to DB before handling the request
  await connectToDatabase();

  try {
    // Fetch the user session
    const session = await getServerSession({ req });
    console.log("Session", session);
    console.log("Session User", session.user);
    if (!session || !session.user) {
      return NextResponse.json({ error: "User not authenticated" });
    }

    const { userId } = session?.user?.id; // Correct access to userId

    // Parse the body of the request
    const { name, email, phone, profilePic } = await req.json();

    // Check if the user has an existing profile
    const existingProfile = await Profile.findOne({ userId });

    if (existingProfile) {
      // Update existing profile
      existingProfile.name = name;
      existingProfile.email = email;
      existingProfile.phone = phone;
      existingProfile.profilePic = profilePic;
      await existingProfile.save();
    } else {
      // Create new profile
      const newProfile = new Profile({
        userId,
        name,
        email,
        phone,
        profilePic,
      });
      await newProfile.save();
    }

    // Return success response
    return NextResponse.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Internal server error" });
  }
}

