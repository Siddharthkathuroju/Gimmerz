// models/questions.js
import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Assuming "User" is the model name
});

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;
