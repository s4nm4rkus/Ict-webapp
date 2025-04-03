const mongoose = require("mongoose");

const SchoolSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
      trim: true,
    },
    schoolLink: {
      type: String,
      trim: true,
    },
    ictCoordinator: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const School = mongoose.model("School", SchoolSchema);
module.exports = School;
