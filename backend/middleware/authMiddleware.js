// Import the 'jsonwebtoken' library to handle JWT token verification.
const jwt = require("jsonwebtoken");

// ==============================
// Authentication Middleware
// ==============================

// This middleware function protects routes by checking for a valid JWT token in the request headers.
const authMiddleware = (req, res, next) => {
  // Retrieve the token from the 'Authorization' header in the incoming request.
  const token = req.header("Authorization");

  // If no token is provided, respond with an unauthorized error.
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(
      // Attempt to decode and verify the token.
      // The 'replace' removes the 'Bearer ' prefix from the token string.
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );
    // If token is valid, attach the decoded user data to the request object
    // so it can be accessed in subsequent middleware or route handlers.
    req.user = decoded;

    // Proceed to the next middleware or route handler.
    next();
  } catch (err) {
    // If token verification fails, respond with an unauthorized error.
    res.status(401).json({ msg: "Token is not valid" });
  }
};
// Export the middleware function for use in route protection elsewhere in the app.
module.exports = authMiddleware;
