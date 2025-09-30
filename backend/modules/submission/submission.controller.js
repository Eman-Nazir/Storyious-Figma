import Submission from "./submission.model.js";
import cloudinary from "../../config/cloudinary.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// Add new submission
export const addSubmission = asyncHandler(async (req, res) => {
  const {
    name, age, city, country, qualification,
    institution, profession, email, phone, about, reason
  } = req.body;

  // Validation
  if (!name || !email || !phone) {
    throw new ApiError(400, "Name, Email, and Phone are required.");
  }

  let fileUrl = undefined;

  // Handle file upload
  if (req.file) {
    console.log("Processing file:", req.file.originalname);
    
    try {
      if (req.file.buffer) {
        console.log("Uploading file buffer to Cloudinary");
        
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        
        let resourceType = "auto";
        if (req.file.mimetype.startsWith('image/')) {
          resourceType = "image";
        } else if (req.file.mimetype.startsWith('video/')) {
          resourceType = "video";
        } else {
          resourceType = "raw";
        }

        const uploadResult = await cloudinary.uploader.upload(dataURI, {
          folder: "submissions",
          resource_type: resourceType,
          public_id: `${req.file.originalname.split(".")[0]}-${Date.now()}`,
        });
        
        fileUrl = uploadResult.secure_url;
        console.log("File uploaded to Cloudinary:", fileUrl);
      } else if (req.file.path) {
        fileUrl = req.file.path;
        console.log("File URL from Cloudinary:", fileUrl);
      }
    } catch (uploadError) {
      console.error("File upload error:", uploadError);
      fileUrl = undefined;
    }
  }

  const newSubmission = new Submission({
    name: name.trim(), 
    age: age?.trim(), 
    city: city?.trim(), 
    country: country?.trim(), 
    qualification: qualification?.trim(),
    institution: institution?.trim(), 
    profession: profession?.trim(), 
    email: email.trim(), 
    phone: phone.trim(), 
    about: about?.trim(),
    reason: reason?.trim(), 
    file: fileUrl
  });

  await newSubmission.save();

  return res.status(201).json(
    new ApiResponse(
      201, 
      newSubmission,
      "Submission successful" + (fileUrl ? " with file" : " without file")
    )
  );
});

// Get all submissions
export const getAllSubmissions = asyncHandler(async (req, res) => {
  const submissions = await Submission.find().sort({ createdAt: -1 });
  
  return res.status(200).json(
    new ApiResponse(
      200,
      submissions,
      "Submissions retrieved successfully"
    )
  );
});

// Get submission by ID
export const getSubmissionById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Submission ID is required");
  }

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

// Update submission
export const updateSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!id) {
    throw new ApiError(400, "Submission ID is required");
  }

  const submission = await Submission.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
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

// Delete submission
export const deleteSubmission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Submission ID is required");
  }

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