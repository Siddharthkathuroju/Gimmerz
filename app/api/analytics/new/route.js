import { getServerSession } from "next-auth";
import { authOptions } from "/utils/authOptions"; // Ensure correct path to your authOptions
import connectoDB from "/utils/database"; // Ensure you have a dbConnect utility
import attendance from "/models/attendance"; // Import Attendance schema
import { NextRequest, NextResponse } from "next/server";

export default async function handler(req, res) {
  await connectoDB(); // Connect to the database

  if (req.method === "GET") {
    try {
      // Fetch the user session
      const session = await getServerSession({req});
      console.log("from_session "+ session?._id);

      if (!session || !session.user) {
        return res.status(401).json({ error: "User not authenticated" });
      }

      const { userId } = session.user; // Assuming the userId is stored in the session

      // Generate attendance data for the current month
      const today = new Date();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();

      // Check if attendance for today already exists
      const existingRecord = await attendance.findOne({
        userId,
        date: { $gte: new Date(today.setHours(0, 0, 0, 0)) },
      });

      if (!existingRecord) {
        // Simulate today's contribution
        const contributed = Math.random() > 0.5; // Random boolean
        const attendanceRecord = new attendance({
          userId,
          date: new Date(),
          contributed,
        });

        await attendanceRecord.save(); // Save to the database
      }

      // Calculate monthly attendance and streak
      const monthlyAttendance = await attendance.countDocuments({
        userId,
        date: {
          $gte: new Date(currentYear, currentMonth, 1),
          $lt: new Date(currentYear, currentMonth + 1, 1),
        },
        contributed: true,
      });

      const streakData = await attendance.find({ userId })
        .sort({ date: -1 })
        .limit(30); // Fetch last 30 days

      let currentStreak = 0;
      for (let i = 0; i < streakData.length; i++) {
        if (streakData[i].contributed) {
          currentStreak++;
        } else {
          break;
        }
      }

      res.status(200).json({
        monthlyAttendance,
        currentStreak,
        totalContributions: streakData.length,
      });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
