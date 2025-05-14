import Files_ICTLabSchedule from "../models/Files/file-ict-lab-sched.js";
import Files_MonthlyMaintenanceReport from "../models/Files/file-monthly-maintenance-report.js";
import Files_ICTLabUsersLogbook from "../models/Files/file-ict-lab-users-logbook.js";
import Files_MaintenanceSchedule from "../models/Files/file-maintenance-sched.js";
import User from "../models/Users.js";

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
      timestamp,
      fileUrl,
      originalFileName,
      owner: userId,
      level,
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

export const getFiles_MaintenanceSchedule = async (req, res) => {
  try {
    const userId = req.user.id; // Get the current user ID from the middleware

    // Fetch files where the owner matches the current user ID
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

//summary reporting
// export const getAllGroupedFiles = async (req, res) => {
//   try {
//     const users = await User.find({ role: "user" });

//     const groupedData = await Promise.all(
//       users.map(async (user) => {
//         const [
//           ictLabSchedules,
//           ictLabUsersLogbooks,
//           maintenanceSchedules,
//           monthlyMaintenanceReports,
//         ] = await Promise.all([
//           Files_ICTLabSchedule.find({ owner: user._id }),
//           Files_ICTLabUsersLogbook.find({ owner: user._id }),
//           Files_MaintenanceSchedule.find({ owner: user._id }),
//           Files_MonthlyMaintenanceReport.find({ owner: user._id }),
//         ]);

//         const groupByMonth = (files) => {
//           const result = {};
//           files.forEach((file) => {
//             const month = new Date(file.timestamp).getMonth(); // Use .timestamp not .createdAt
//             if (!result[month]) result[month] = [];
//             result[month].push(file);
//           });
//           return result;
//         };

//         return {
//           userId: user._id, // You wanted this
//           school: user.schoolName,
//           ictCoordinator: `${user.firstName} ${user.lastName}`,
//           files: [
//             ...ictLabSchedules,
//             ...ictLabUsersLogbooks,
//             ...maintenanceSchedules,
//             ...monthlyMaintenanceReports,
//           ],
//           uploadsPerMonth: {
//             logbook: groupByMonth(ictLabUsersLogbooks),
//             maintenanceReport: groupByMonth(monthlyMaintenanceReports),
//           },
//         };
//       })
//     );

//     res.json(groupedData);
//   } catch (error) {
//     console.error("❌ Error fetching grouped files:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export const getAllGroupedFiles = async (req, res) => {
//   try {
//     const users = await User.find({ role: "user" });
//     const currentYear = new Date().getFullYear();

//     const groupedData = await Promise.all(
//       users.map(async (user) => {
//         const [
//           ictLabSchedules,
//           ictLabUsersLogbooks,
//           maintenanceSchedules,
//           monthlyMaintenanceReports,
//         ] = await Promise.all([
//           Files_ICTLabSchedule.find({ owner: user._id }),
//           Files_ICTLabUsersLogbook.find({ owner: user._id }),
//           Files_MaintenanceSchedule.find({ owner: user._id }),
//           Files_MonthlyMaintenanceReport.find({ owner: user._id }),
//         ]);

//         const groupByMonth = (files) => {
//           const result = {};
//           files.forEach((file) => {
//             const date = new Date(file.timestamp);
//             const month = date.getMonth();
//             const year = date.getFullYear();
//             if (year !== currentYear) return;
//             if (!result[month]) result[month] = [];
//             result[month].push(file);
//           });
//           return result;
//         };

//         // Maintenance Schedule: Uploaded if there’s a file from June of current year
//         const isMaintenanceScheduleUploaded = maintenanceSchedules.some(
//           (file) => {
//             const date = new Date(file.timestamp);
//             return date.getFullYear() === currentYear && date.getMonth() === 5;
//           }
//         );

//         // ICT Lab Schedule
//         let isICTLabScheduleUploaded = false;
//         let ictLabScheduleGrouped;

//         if (user.level === "Elementary/JHS") {
//           ictLabScheduleGrouped = ictLabSchedules.filter((file) => {
//             const date = new Date(file.timestamp);
//             return date.getFullYear() === currentYear && date.getMonth() === 5;
//           });
//           isICTLabScheduleUploaded = ictLabScheduleGrouped.length > 0;
//         } else if (user.level === "Senior High School") {
//           ictLabScheduleGrouped = {
//             firstSemester: [],
//             secondSemester: [],
//           };

//           ictLabSchedules.forEach((file) => {
//             const date = new Date(file.timestamp);
//             const month = date.getMonth();
//             const year = date.getFullYear();
//             if (year !== currentYear) return;

//             if (month >= 5 && month <= 10) {
//               ictLabScheduleGrouped.firstSemester.push(file);
//             } else if (month === 11 || month <= 4) {
//               ictLabScheduleGrouped.secondSemester.push(file);
//             }
//           });

//           const currentMonth = new Date().getMonth();
//           if (currentMonth >= 5 && currentMonth <= 10) {
//             // June–Nov (First Sem)
//             isICTLabScheduleUploaded =
//               ictLabScheduleGrouped.firstSemester.length > 0;
//           } else {
//             // Dec–May (Second Sem)
//             isICTLabScheduleUploaded =
//               ictLabScheduleGrouped.secondSemester.length > 0;
//           }
//         }

//         return {
//           userId: user._id,
//           school: user.schoolName,
//           ictCoordinator: `${user.firstName} ${user.lastName}`,
//           level: user.level,
//           files: [
//             ...ictLabSchedules,
//             ...ictLabUsersLogbooks,
//             ...maintenanceSchedules,
//             ...monthlyMaintenanceReports,
//           ],
//           uploadsPerMonth: {
//             logbook: groupByMonth(ictLabUsersLogbooks),
//             maintenanceReport: groupByMonth(monthlyMaintenanceReports),
//           },
//           ictLabScheduleGrouped,
//           maintenanceScheduleGrouped: maintenanceSchedules.filter((file) => {
//             const date = new Date(file.timestamp);
//             return date.getFullYear() === currentYear && date.getMonth() === 5;
//           }),
//           isICTLabScheduleUploaded,
//           isMaintenanceScheduleUploaded,
//         };
//       })
//     );

//     res.json(groupedData);
//   } catch (error) {
//     console.error("❌ Error fetching grouped files:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export const getAllGroupedFiles = async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    const currentYear = new Date().getFullYear();

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
