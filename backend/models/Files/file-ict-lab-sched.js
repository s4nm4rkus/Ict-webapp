// Import mongoose to define and work with MongoDB schemas and models
import mongoose from "mongoose";

// ==============================
// Define File Schema
// ==============================

// Create a new schema for storing uploaded files, including metadata such as title, description, level, and file information.
const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  level: {
    type: String,
    enum: ["Elementary/JHS", "Senior High School"],
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true },
  originalFileName: { type: String, required: true },

  // Reference to the user who uploaded the file; links to the "User" collection
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Create and export a Mongoose model named "Files_ICTLabSchedule" based on the defined schema.
// This model will be used to interact with the "Files_ICTLabSchedule" collection in the database.
const Files_ICTLabSchedule = mongoose.model("Files_ICTLabSchedule", fileSchema);

export default Files_ICTLabSchedule;
