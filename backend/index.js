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
    origin: "https://sdotayabas-ict-webapp.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error connecting to MongoDB:", error));

app.use("/api/auth", authRoutes); // Corrected route usage
app.use("/api", uploadRoutes);

app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
