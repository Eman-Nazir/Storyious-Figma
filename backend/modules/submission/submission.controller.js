import Submission from "./submission.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// ADD a new submission
export const addSubmission = asyncHandler(async (req, res) => {
  const {
    name,
    age,
    city,
    country,
    qualification,
    institution,
    profession,
    email,
    phone,
    about,
    reason,
  } = req.body;

  // Check if file upload failed
  if (req.fileValidationError) {
    throw new ApiError(400, req.fileValidationError);
  }

  const file = req.file ? req.file.path : undefined;

  // Validate required fields
  if (!name || !email || !phone) {
    // If there was a file uploaded but other validations failed, we might want to remove it
    // However, Cloudinary automatically manages files, so we don't need to delete it manually
    throw new ApiError(400, "Name, Email, and Phone are required.");
  }

  const newSubmission = new Submission({
    name,
    age,
    city,
    country,
    qualification,
    institution,
    profession,
    email,
    phone,
    about,
    reason,
    file,
  });

  await newSubmission.save();

  res
    .status(201)
    .json(new ApiResponse(201, newSubmission, "Submission successful"));
});

// GET all submissions
export const getAllSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find().sort({ createdAt: -1 });

  res
    .status(200)
    .json(new ApiResponse(200, submissions, "Submissions retrieved successfully"));
});