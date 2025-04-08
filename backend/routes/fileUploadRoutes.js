import express from "express";
import mongoose from "mongoose";
import {
  uploadFile_ICTLabSchedule,
  getFiles_ICTLabSchedule,
  uploadFile_MonthlyMaintenanceReport,
  getFiles_MonthlyMaintenanceReport,
  uploadFile_ICTLabUsersLogbook,
  getFiles_ICTLabUsersLogbook,
} from "../controllers/file.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

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

export default router;
