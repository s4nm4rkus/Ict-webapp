import express from "express";
import mongoose from "mongoose";
import {
  uploadFile_ICTLabSchedule,
  getFiles_ICTLabSchedule,
  uploadFile_MonthlyMaintenanceReport,
  getFiles_MonthlyMaintenanceReport,
  uploadFile_ICTLabUsersLogbook,
  getFiles_ICTLabUsersLogbook,
  uploadFile_MaintenanceSchedule,
  getFiles_MaintenanceSchedule,
} from "../controllers/file.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Files_ICTLabSchedule from "../models/Files/file-ict-lab-sched.js";
import Files_MaintenanceSchedule from "../models/Files/file-maintenance-sched.js";
import Files_ICTLabUsersLogBook from "../models/Files/file-ict-lab-users-logbook.js";
import Files_MonthlyMaintenanceReport from "../models/Files/file-monthly-maintenance-report.js";

const router = express.Router();

router.post(
  "/upload/ict-laboratory-schedule",
  authMiddleware,
  uploadFile_ICTLabSchedule
);

router.get(
  "/files/ict-laboratory-schedule",
  authMiddleware,
  getFiles_ICTLabSchedule
);

router.post(
  "/upload/monthly-maintenance-report",
  authMiddleware,
  uploadFile_MonthlyMaintenanceReport
);

router.get(
  "/files/monthly-maintenance-report",
  authMiddleware,
  getFiles_MonthlyMaintenanceReport
);

router.post(
  "/upload/ict-laboratory-users-logbook",
  authMiddleware,
  uploadFile_ICTLabUsersLogbook
);

router.get(
  "/files/ict-laboratory-users-logbook",
  authMiddleware,
  getFiles_ICTLabUsersLogbook
);

router.post(
  "/upload/maintenance-schedule",
  authMiddleware,
  uploadFile_MaintenanceSchedule
);

router.get(
  "/files/maintenance-schedule",
  authMiddleware,
  getFiles_MaintenanceSchedule
);

// Admin routes

router.get("/files/ict-laboratory-schedule/:userId", async (req, res) => {
  try {
    const files = await Files_ICTLabSchedule.find({ owner: req.params.userId });
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching user files:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/files/maintenance-schedule/:userId", async (req, res) => {
  try {
    const files = await Files_MaintenanceSchedule.find({
      owner: req.params.userId,
    });
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching user files:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/files/ict-laboratory-users-log-book/:userId", async (req, res) => {
  try {
    const files = await Files_ICTLabUsersLogBook.find({
      owner: req.params.userId,
    });
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching user files:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/files/monthly-maintenance-report/:userId", async (req, res) => {
  try {
    const files = await Files_MonthlyMaintenanceReport.find({
      owner: req.params.userId,
    });
    res.status(200).json({ files });
  } catch (error) {
    console.error("Error fetching user files:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
