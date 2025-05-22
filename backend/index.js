/**
 * =========================================================
 * Server Entry Point (Express Backend)
 * ---------------------------------------------------------
 * Purpose:
 * - Initializes Express application
 * - Connects to MongoDB using Mongoose
 * - Configures middleware (CORS, JSON parsing)
 * - Mounts API route handlers for:
 *   - Authentication (`/api/auth`)
 *   - File Upload and Retrieval (`/api`)
 *
 * Notes:
 * - Uses environment variables from `.env` (via dotenv)
 * - CORS is configured to allow frontend hosted on Vercel
 * =========================================================
 */

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from "./routes/auth.route.js";
import uploadRoutes from "./routes/fileUploadRoutes.js";

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error));
// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", uploadRoutes);
// Base route
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});
// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
