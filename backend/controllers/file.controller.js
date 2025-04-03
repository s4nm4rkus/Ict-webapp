import File from "../models/file.js";

// export const uploadFile = async (req, res) => {
//   res.json({ message: "Upload route working!" });
//   console.log("Received upload request:", req.body);

//   const { title, description, timestamp, fileUrl } = req.body;

//   if (!title || !description || !fileUrl) {
//     return res.status(400).json({ error: "Missing required fields" });
//   }

//   try {
//     const newFile = new File({
//       title,
//       description,
//       timestamp: timestamp || new Date(),
//       fileUrl,
//     });

//     await newFile.save();

//     console.log("File saved to database:", newFile);
//     res.status(201).json({ message: "File saved successfully", file: newFile });
//   } catch (error) {
//     console.error("Database save error:", error);
//     res.status(500).json({ error: "Failed to save file" });
//   }
// };

export const uploadFile = async (req, res) => {
  try {
    const { title, description, timestamp, fileUrl } = req.body;

    if (!title || !description || !fileUrl) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFile = new File({ title, description, timestamp, fileUrl });
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
