import mongoose from "mongoose";

export const connectoDB = async () => {
  mongoose.set("strictQuery", true);

  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "gimmer_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected");

    // Start a session
    const session = await connection.startSession();
    console.log("MongoDB session started");

    return session;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Optional: Rethrow error for higher-level error handling
  }
};

export default connectoDB;
