import express from "express";
import mongoose from "mongoose";
import {
  uploadFile_ICTLabSchedule,
  getFiles_ICTLabSchedule,
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

export default router;
