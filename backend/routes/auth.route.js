/**
 * ================================================
 * Auth Routes
 * -----------------------------------------------
 * This file defines all the routes related to user
 * authentication and user management using Express Router.
 *
 * Purpose of this router:
 * - Organize all authentication-related endpoints in one place
 * - Connect route paths to controller functions
 * - Apply middleware (like authentication checks) as needed
 * - Keep the server logic modular and maintainable
 *
 * Routes included:
 * - POST   /register     → Register a new user
 * - POST   /login        → Log in an existing user
 * - GET    /me           → Get the current logged-in user's info (requires auth)
 * - POST   /logout       → Log out the user
 * - GET    /all          → Get all users (admin only, requires auth)
 * - GET    /user/:userId → Get user by ID (requires auth)
 * ================================================
 */

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.js");

// Create a new instance of the Express Router
// This router will handle all authentication-related API endpoints
const router = express.Router();
const { getUserById } = require("../controllers/auth.controller.js");

// Middleware to protect routes that require authentication
const authMiddleware = require("../middleware/authMiddleware");

// Import controller functions that contain the logic for each route
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
