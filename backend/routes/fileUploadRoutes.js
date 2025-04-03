import express from "express";
import mongoose from "mongoose";
import { uploadFile } from "../controllers/file.controller.js";

const router = express.Router();

router.post("/upload", uploadFile);

export default router;
