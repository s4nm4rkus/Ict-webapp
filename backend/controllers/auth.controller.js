const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
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

exports.register = async (req, res) => {
  const { email, password, firstName, lastName, contactNumber, schoolName } =
    req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      contactNumber,
      schoolName,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        email,
        firstName,
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

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// exports.getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ msg: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     console.error("Error fetching current user:", error);
//     res.status(500).json({ msg: "Server error", error });
//   }
// };

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ msg: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};
