import mongoose from "mongoose";

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
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Ensure correct export of the model
const Files_ICTLabSchedule = mongoose.model("Files_ICTLabSchedule", fileSchema);

export default Files_ICTLabSchedule;
