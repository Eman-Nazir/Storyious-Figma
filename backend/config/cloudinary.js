import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

const requiredVariables = [
  "CLOUDINARY_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_SECRET_KEY",
];

const missingVariables = requiredVariables.filter((name) => {
  const value = process.env[name];

  return typeof value !== "string" || value.trim() === "";
});

if (missingVariables.length > 0) {
  throw new Error(
    "Missing required backend environment variables: " +
      missingVariables.join(", ")
  );
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME.trim(),
  api_key: process.env.CLOUDINARY_API_KEY.trim(),
  api_secret: process.env.CLOUDINARY_SECRET_KEY.trim(),
  secure: true,
});

export default cloudinary;