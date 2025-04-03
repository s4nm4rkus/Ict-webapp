import Files_ICTLabSchedule from "../models/file.js";

export const uploadFile_ICTLabSchedule = async (req, res) => {
  try {
    const { title, description, timestamp, fileUrl } = req.body;

    if (!title || !description || !fileUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFile = new Files_ICTLabSchedule({
      title,
      description,
      timestamp,
      fileUrl,
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
