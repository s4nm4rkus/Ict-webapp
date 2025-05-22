/**
 * =========================================================
 * File Upload & Retrieval Routes
 * ---------------------------------------------------------
 * This router handles uploading and retrieving files related
 * to the ICT Laboratory system. It separates routes for:
 * - ICT Laboratory Schedules
 * - Monthly Maintenance Reports
 * - ICT Laboratory Users Logbooks
 * - Maintenance Schedules
 *
 * Purpose:
 * - Allow authenticated users to upload and retrieve documents
 * - Enable admins to fetch files by specific user ID
 * - Provide grouped summaries of uploaded files
 *
 * Routes:
 * -------------------------
 * USER ROUTES (requires authentication)
 * POST /upload/ict-laboratory-schedule
 * GET  /files/ict-laboratory-schedule
 *
 * POST /upload/monthly-maintenance-report
 * GET  /files/monthly-maintenance-report
 *
 * POST /upload/ict-laboratory-users-logbook
 * GET  /files/ict-laboratory-users-logbook
 *
 * POST /upload/maintenance-schedule
 * GET  /files/maintenance-schedule
 *
 * -------------------------
 * ADMIN ROUTES (fetch by userId)
 * GET /files/ict-laboratory-schedule/:userId
 * GET /files/maintenance-schedule/:userId
 * GET /files/ict-laboratory-users-log-book/:userId
 * GET /files/monthly-maintenance-report/:userId
 *
 * -------------------------
 * SUMMARY ROUTE
 * GET /admin/summary → Returns grouped summary of all uploaded files
 * =========================================================
 */

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
  getAllGroupedFiles,
} from "../controllers/file.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import Files_ICTLabSchedule from "../models/Files/file-ict-lab-sched.js";
import Files_MaintenanceSchedule from "../models/Files/file-maintenance-sched.js";
import Files_ICTLabUsersLogBook from "../models/Files/file-ict-lab-users-logbook.js";
import Files_MonthlyMaintenanceReport from "../models/Files/file-monthly-maintenance-report.js";

const router = express.Router();

// USER ROUTES (Upload + Get files)
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

// ADMIN ROUTES (Fetch user files by user ID)
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

// Summary route for admin
router.get("/admin/summary", authMiddleware, getAllGroupedFiles);

export default router;
