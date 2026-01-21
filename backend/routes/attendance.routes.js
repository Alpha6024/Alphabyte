import express from "express";
import crypto from "crypto";
import AttendanceSession from "../models/attendanceSession.js";
import Attendance from "../models/attendance.js";
import auth from "../middleware/auth.js";

const router = express.Router();

/* Generate QR */
router.post("/generate", auth, async (req, res) => {
  const { eventId, duration } = req.body;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + duration * 60000);

  const session = await AttendanceSession.create({
    eventId,
    organizerId: req.user.id,
    token,
    expiresAt
  });

  res.json({
    qrUrl: `${process.env.FRONTEND_URL}/scan?token=${token}`,
    expiresAt
  });
});

/* Mark Attendance */
router.post("/mark", auth, async (req, res) => {
  const { token } = req.body;

  const session = await AttendanceSession.findOne({ token });

  if (!session || session.expiresAt < new Date())
    return res.status(400).json({ message: "QR expired" });

  const exists = await Attendance.findOne({
    eventId: session.eventId,
    studentId: req.user.id
  });

  if (exists)
    return res.status(400).json({ message: "Already marked" });

  await Attendance.create({
    eventId: session.eventId,
    studentId: req.user.id,
    sessionId: session._id
  });

  res.json({ message: "Attendance marked" });
});

export default router;
