import Files_ICTLabSchedule from "../models/Files/file-ict-lab-sched.js";
import Files_MonthlyMaintenanceReport from "../models/Files/file-monthly-maintenance-report.js";
import Files_ICTLabUsersLogbook from "../models/Files/file-ict-lab-users-logbook.js";

export const uploadFile_ICTLabSchedule = async (req, res) => {
  try {
    const { title, description, level, timestamp, fileUrl, originalFileName } =
      req.body;
    const userId = req.user.id;

    if (!title || !description || !fileUrl || !originalFileName || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFile = new Files_ICTLabSchedule({
      title,
      description,
      level,
      timestamp,
      fileUrl,
      originalFileName,
      owner: userId,
    });
    await newFile.save();

    console.log("✅ File saved to database:", newFile);

    return res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("❌ Database save error:", error);

    return res
      .status(500)
      .json({ error: "Database Error", details: error.message });
  }
};

export const getFiles_ICTLabSchedule = async (req, res) => {
  try {
    const userId = req.user.id; // Get the current user ID from the middleware

    // Fetch files where the owner matches the current user ID
    const files = await Files_ICTLabSchedule.find({ owner: userId });

    if (!files.length) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    return res
      .status(200)
      .json({ message: "Files fetched successfully", files });
  } catch (error) {
    console.error("❌ Error fetching files:", error);
    return res
      .status(500)
      .json({ error: "Database Error", details: error.message });
  }
};

export const uploadFile_MonthlyMaintenanceReport = async (req, res) => {
  try {
    const { title, description, timestamp, fileUrl, originalFileName } =
      req.body;
    const userId = req.user.id;

    if (!title || !description || !fileUrl || !originalFileName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFile = new Files_MonthlyMaintenanceReport({
      title,
      description,
      timestamp,
      fileUrl,
      originalFileName,
      owner: userId,
    });
    await newFile.save();

    console.log("✅ File saved to database:", newFile);

    return res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("❌ Database save error:", error);

    return res
      .status(500)
      .json({ error: "Database Error", details: error.message });
  }
};

export const getFiles_MonthlyMaintenanceReport = async (req, res) => {
  try {
    const userId = req.user.id; // Get the current user ID from the middleware

    // Fetch files where the owner matches the current user ID
    const files = await Files_MonthlyMaintenanceReport.find({ owner: userId });

    if (!files.length) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    return res
      .status(200)
      .json({ message: "Files fetched successfully", files });
  } catch (error) {
    console.error("❌ Error fetching files:", error);
    return res
      .status(500)
      .json({ error: "Database Error", details: error.message });
  }
};

export const uploadFile_ICTLabUsersLogbook = async (req, res) => {
  try {
    const { title, description, timestamp, fileUrl, originalFileName } =
      req.body;
    const userId = req.user.id;

    if (!title || !description || !fileUrl || !originalFileName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFile = new Files_ICTLabUsersLogbook({
      title,
      description,
      timestamp,
      fileUrl,
      originalFileName,
      owner: userId,
    });
    await newFile.save();

    console.log("✅ File saved to database:", newFile);

    return res
      .status(201)
      .json({ message: "File uploaded successfully", file: newFile });
  } catch (error) {
    console.error("❌ Database save error:", error);

    return res
      .status(500)
      .json({ error: "Database Error", details: error.message });
  }
};

export const getFiles_ICTLabUsersLogbook = async (req, res) => {
  try {
    const userId = req.user.id; // Get the current user ID from the middleware

    // Fetch files where the owner matches the current user ID
    const files = await Files_ICTLabUsersLogbook.find({ owner: userId });

    if (!files.length) {
      return res.status(404).json({ message: "No files found for this user" });
    }

    return res
      .status(200)
      .json({ message: "Files fetched successfully", files });
  } catch (error) {
    console.error("❌ Error fetching files:", error);
    return res
      .status(500)
      .json({ error: "Database Error", details: error.message });
  }
};
