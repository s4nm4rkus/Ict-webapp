//Importing file models and user model
import Files_ICTLabSchedule from "../models/Files/file-ict-lab-sched.js";
import Files_MonthlyMaintenanceReport from "../models/Files/file-monthly-maintenance-report.js";
import Files_ICTLabUsersLogbook from "../models/Files/file-ict-lab-users-logbook.js";
import Files_MaintenanceSchedule from "../models/Files/file-maintenance-sched.js";
import User from "../models/Users.js";

// ------------------ Upload ICT Lab Schedule File ------------------
export const uploadFile_ICTLabSchedule = async (req, res) => {
  try {
    // Destructure fields from request body
    const { title, description, level, timestamp, fileUrl, originalFileName } =
      req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !description || !fileUrl || !originalFileName || !level) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    // Create and save a new file document in the database
    const newFile = new Files_ICTLabSchedule({
      title,
      description,
      timestamp,
      fileUrl,
      originalFileName,
      owner: userId,
      level,
    });
    await newFile.save();

    // Log and return success response
    console.log("✅ File saved to database:", newFile);
    // Handle and return database error
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

// ------------------ Get ICT Lab Schedule Files (per user) ------------------
export const getFiles_ICTLabSchedule = async (req, res) => {
  try {
    // Get the current user ID from the middleware
    const userId = req.user.id;
    // Fetch files owned by the current user
    const files = await Files_ICTLabSchedule.find({ owner: userId });
    // Return not found if empty
    if (!files.length) {
      return res.status(404).json({ message: "No files found for this user" });
    }
    // Return found files
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

// ------------------ Upload Monthly Maintenance Report File ------------------
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

// ------------------ Get Monthly Maintenance Reports (per user) ------------------
export const getFiles_MonthlyMaintenanceReport = async (req, res) => {
  try {
    const userId = req.user.id;
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

// ------------------ Upload ICT Lab Users Logbook File ------------------
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

// ------------------ Get ICT Lab Users Logbooks (per user) ------------------
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

// ------------------ Upload Maintenance Schedule File ------------------
export const uploadFile_MaintenanceSchedule = async (req, res) => {
  try {
    const { title, description, level, timestamp, fileUrl, originalFileName } =
      req.body;
    const userId = req.user.id;

    if (!title || !description || !fileUrl || !originalFileName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFile = new Files_MaintenanceSchedule({
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
// ------------------  Get Maintenance Schedules (per user) ------------------
export const getFiles_MaintenanceSchedule = async (req, res) => {
  try {
    const userId = req.user.id;
    const files = await Files_MaintenanceSchedule.find({ owner: userId });

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

// ==============================
// Get All Grouped Files by User
// - Combines all uploads from all users with 'user' role
// - Groups some file types by month for reporting
// ==============================
export const getAllGroupedFiles = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }); // Get all users with role "user"
    const currentYear = new Date().getFullYear();

    // For each user, fetch associated files and group by month/year
    const groupedData = await Promise.all(
      users.map(async (user) => {
        const [
          ictLabSchedules,
          ictLabUsersLogbooks,
          maintenanceSchedules,
          monthlyMaintenanceReports,
        ] = await Promise.all([
          Files_ICTLabSchedule.find({ owner: user._id }),
          Files_ICTLabUsersLogbook.find({ owner: user._id }),
          Files_MaintenanceSchedule.find({ owner: user._id }),
          Files_MonthlyMaintenanceReport.find({ owner: user._id }),
        ]);
        // Helper to group files by month if timestamp matches the current year
        const groupByMonth = (files) => {
          const result = {};
          files.forEach((file) => {
            const date = new Date(file.timestamp);
            const month = date.getMonth();
            const year = date.getFullYear();
            if (year === currentYear) {
              if (!result[month]) result[month] = [];
              result[month].push(file);
            }
          });
          return result;
        };
        // Return a structured object per user for frontend or reporting
        return {
          userId: user._id,
          school: user.schoolName || "Unknown",
          ictCoordinator: `${user.firstName} ${
            user.mInitial ? user.mInitial + "." : ""
          } ${user.lastName}`,

          uploads: {
            ictLabSched: ictLabSchedules,
            maintenanceSched: maintenanceSchedules,
          },
          uploadsPerMonth: {
            logbook: groupByMonth(ictLabUsersLogbooks),
            maintenanceReport: groupByMonth(monthlyMaintenanceReports),
          },
        };
      })
    );

    res.status(200).json(groupedData);
  } catch (error) {
    console.error("Error fetching grouped files:", error);
    res.status(500).json({ message: "Server error while fetching data." });
  }
};
