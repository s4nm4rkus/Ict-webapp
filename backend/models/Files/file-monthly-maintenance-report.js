import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  fileUrl: { type: String, required: true },
  originalFileName: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Ensure correct export of the model
const Files_MonthlyMaintenanceReport = mongoose.model(
  "Files_MonthlyMaintenanceReport",
  fileSchema
);

export default Files_MonthlyMaintenanceReport;
