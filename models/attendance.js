const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  date: { type: Date, required: true },
  contributed: { type: Boolean, default: false },
});

module.exports = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
