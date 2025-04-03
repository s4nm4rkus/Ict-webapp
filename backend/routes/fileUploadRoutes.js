import express from "express";
import mongoose from "mongoose";
import { uploadFile_ICTLabSchedule } from "../controllers/file.controller.js";

const router = express.Router();

router.post("/upload/ict-laboratory-schedule", uploadFile_ICTLabSchedule);

export default router;
