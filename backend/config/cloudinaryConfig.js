// Import the Cloudinary v2 SDK module
// Cloudinary is a cloud-based image and video management service
import { v2 as cloudinary } from "cloudinary";

// Import and configure dotenv to load environment variables from a .env file
// This helps keep your sensitive credentials (like API keys) out of the source code
import dotenv from "dotenv";

// Load environment variables from the .env file into process.env
dotenv.config();

// Configure the Cloudinary SDK with your credentials and options
// These values are loaded from environment variables for security
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Your Cloudinary cloud name (found in your Cloudinary dashboard)
  api_key: process.env.CLOUDINARY_API_KEY, // Your Cloudinary API key
  api_secret: process.env.CLOUDINARY_API_SECRET, // Your Cloudinary API secret (keep this private)
  secure: true, // Ensures HTTPS is used for all URLs generated
});

// Export the configured cloudinary instance so it can be used elsewhere in your app
export default cloudinary;
