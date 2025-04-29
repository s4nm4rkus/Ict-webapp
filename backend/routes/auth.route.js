const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");
const router = express.Router();
const { getUserById } = require("../controllers/auth.controller.js");
const authMiddleware = require("../middleware/authMiddleware");
const {
  login,
  register,
  getMe,
  logout,
  getAllUsers,
} = require("../controllers/auth.controller.js");

router.post("/register", register);

router.post("/login", login);

router.get("/me", authMiddleware, getMe);

router.post("/logout", logout);

router.get("/all", authMiddleware, getAllUsers);

router.get("/user/:userId", authMiddleware, getUserById);

module.exports = router;
