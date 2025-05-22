const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/Users");

// ------------------ LOGIN ------------------
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    // Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    // Generate JWT token upon successful login
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // Send token and user info (excluding password)
    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        mInitial: user.mInitial,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        schoolName: user.schoolName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// ------------------ REGISTER ------------------
exports.register = async (req, res) => {
  const {
    email,
    password,
    firstName,
    mInitial,
    lastName,
    contactNumber,
    schoolName,
    role,
  } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }
    // Create new user instance
    const newUser = new User({
      email,
      password,
      firstName,
      mInitial,
      lastName,
      contactNumber,
      schoolName,
      role: role || "user", // default role is "user"
    });
    // Save new user to the database
    await newUser.save();
    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // Respond with token and user data (excluding password)
    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        email,
        role: newUser.role,
        firstName,
        mInitial,
        lastName,
        contactNumber,
        schoolName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// ------------------ GET LOGGED-IN USER ------------------
exports.getMe = async (req, res) => {
  try {
    // Get user from DB by ID, exclude password field
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// ------------------ LOGOUT USER ------------------
exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// ------------------ GET ALL USERS WITH ROLE 'user' ------------------
exports.getAllUsers = async (req, res) => {
  try {
    // Fetch only users with role "user" and exclude their password
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ users });
  } catch (err) {
    console.error("❌ Error fetching users with role 'user':", err);
    res.status(500).json({ msg: "Server error fetching users" });
  }
};

// ------------------ GET USER BY ID ------------------
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate if userId is a valid MongoDB ObjectId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    // Fetch user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // Return user data
    return res.json({ user });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ msg: "Server error" });
  }
};
