import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
import { 
  addSubmission, 
  getAllSubmissions, 
  getSubmissionById, 
  updateSubmission, 
  deleteSubmission 
} from "./submission.controller.js";

const router = express.Router();


router.post(
  "/create",
  (req, res, next) => {
    const upload = Upload("submissions").single("file");
    
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: err.message || "File upload failed",
        });
      }
      next();
    });
  },
  addSubmission
);

// Get all submissions
router.get("/", getAllSubmissions);

// Get submission by ID
router.get("/:id", getSubmissionById);

// Update submission
router.put("/:id", updateSubmission);

// Delete submission
router.delete("/:id", deleteSubmission);

export default router;