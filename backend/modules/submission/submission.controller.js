
import Submission from "./submission.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// ADD a new submission
export const addSubmission = asyncHandler(async (req, res) => {
    console.log("BODY:", req.body);
  console.log("FILE:", req.file);
  const {
    name, age, city, country,
    qualification, institution, profession,
    email, phone, about, reason
  } = req.body;

  const file = req.file ? req.file.path : undefined; 

  if (!name || !email || !phone) {
    throw new ApiError(400, "Name, Email, and Phone are required.");
  }

  const newSubmission = new Submission({
    name, age, city, country,
    qualification, institution, profession,
    email, phone, about, reason, file,
  });

  await newSubmission.save();

  res.status(201).json(new ApiResponse(201, newSubmission, "Submission successful"));
});

// GET all submissions
export const getAllSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, submissions, "Submissions retrieved successfully"));
});
