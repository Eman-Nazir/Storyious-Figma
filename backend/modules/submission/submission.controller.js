import Submission from "./submission.model.js";

// Add new submission
export const addSubmission = async (req, res) => {
  try {
    const {
      name, age, city, country, qualification,
      institution, profession, email, phone, about, reason
    } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, Email, and Phone are required." });
    }

    // File URL from Cloudinary
    const file = req.file ? req.file.path : undefined;

    const newSubmission = new Submission({
      name, age, city, country, qualification,
      institution, profession, email, phone, about,
      reason, file
    });

    await newSubmission.save();

    return res.status(201).json({
      status: "success",
      message: "Submission successful",
      data: newSubmission
    });

  } catch (error) {
    console.error("Error in addSubmission:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error: Unable to submit",
      error: error.message
    });
  }
};

// Get all submissions
export const getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ createdAt: -1 });
    return res.status(200).json({
      status: "success",
      message: "Submissions retrieved successfully",
      data: submissions
    });
  } catch (error) {
    console.error("Error in getAllSubmissions:", error);
    return res.status(500).json({
      status: "error",
      message: "Server error: Unable to fetch submissions",
      error: error.message
    });
  }
};
