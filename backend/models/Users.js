// Import mongoose to define and work with MongoDB schemas and models
const mongoose = require("mongoose");
// Import bcryptjs for hashing passwords securely
const bcrypt = require("bcryptjs");

// =====================================
// Define User Schema
// =====================================

// Create a schema to define the structure of User documents in MongoDB
const UserSchema = new mongoose.Schema({
  // User's email address; must be unique and trimmed to remove whitespace
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  // User's password; must be at least 6 characters
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  firstName: {
    type: String,
    required: true,
  },
  mInitial: {
    type: String,
    required: true,
    maxlength: 1,
    trim: true,
  },

  lastName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },

  // Role of the user; either "user" or "admin", defaults to "user"
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

// =====================================
// Password Hashing Middleware
// =====================================

// This middleware runs automatically before saving a user to the database
// It checks if the password field has been modified; if yes, it hashes it using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // Skip hashing if password wasn't changed

  // Generate salt for hashing
  const salt = await bcrypt.genSalt(10);

  // Hash the password using the generated salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// =====================================
// Export User Model
// =====================================

// Create a Mongoose model named "User" based on the UserSchema
// This model allows interaction with the "users" collection in MongoDB
const User = mongoose.model("User", UserSchema);
module.exports = User;
