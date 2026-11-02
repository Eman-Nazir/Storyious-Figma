import mongoose from "mongoose";
import Submission from "./submission.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { validateSubmission } from "../../utils/validation.js";
import {
  uploadBufferedFiles,
  cleanupUploadedFiles,
} from "../../middleware_temp/multerMiddleware.js";

const validateSubmissionId = (id) => {
  if (
    typeof id !== "string" ||
    !mongoose.Types.ObjectId.isValid(id)
  ) {
    throw new ApiError(400, "Invalid submission ID");
  }
};

export const addSubmission = asyncHandler(async (req, res) => {
  // Validate form fields before contacting Cloudinary.
  const data = validateSubmission(req.body);

  let newSubmission;

  try {
    await uploadBufferedFiles(req, "submissions");

    const fileUrl = req.file?.path;

    if (
      req.file &&
      (typeof fileUrl !== "string" || !fileUrl)
    ) {
      throw new ApiError(
        502,
        "File upload did not return a URL"
      );
    }

    newSubmission = new Submission({
      ...data,
      ...(fileUrl ? { file: fileUrl } : {}),
    });

    await newSubmission.save();
  } catch (error) {
    try {
      await cleanupUploadedFiles(req);
    } catch {
      console.error(
        "Failed to clean up a submission attachment"
      );
    }

    throw error;
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      newSubmission,
      "Submission successful" +
        (newSubmission.file ? " with file" : " without file")
    )
  );
});

export const getAllSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find().sort({
    createdAt: -1,
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      submissions,
      "Submissions retrieved successfully"
    )
  );
});

export const getSubmissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateSubmissionId(id);

  const submission = await Submission.findById(id);

  if (!submission) {
    throw new ApiError(404, "Submission not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      submission,
      "Submission retrieved successfully"
    )
  );
});

export const updateSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateSubmissionId(id);

  const updateData = validateSubmission(req.body, {
    partial: true,
  });

  if (Object.keys(updateData).length === 0) {
    throw new ApiError(
      400,
      "No valid submission fields provided"
    );
  }

  const submission = await Submission.findByIdAndUpdate(
    id,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!submission) {
    throw new ApiError(404, "Submission not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      submission,
      "Submission updated successfully"
    )
  );
});

export const deleteSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  validateSubmissionId(id);

  const submission = await Submission.findByIdAndDelete(id);

  if (!submission) {
    throw new ApiError(404, "Submission not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Submission deleted successfully"
    )
  );
});