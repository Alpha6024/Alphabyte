import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event"
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AttendanceSession"
  },
  markedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Attendance", attendanceSchema);
