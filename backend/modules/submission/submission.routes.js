import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";
import {
  addSubmission,
  getAllSubmissions,
  getSubmissionById,
  updateSubmission,
  deleteSubmission,
} from "./submission.controller.js";

const router = express.Router();

// Parse and check the file, then validate the form in the controller.
// Cloudinary upload happens only after form validation succeeds.
router.post(
  "/create",
  Upload("submissions", {
    deferUpload: true,
  }).single("file"),
  addSubmission
);

// Private administration.
router.get(
  "/",
  auth,
  requireRole("admin"),
  getAllSubmissions
);

router.get(
  "/:id",
  auth,
  requireRole("admin"),
  getSubmissionById
);

router.put(
  "/:id",
  auth,
  requireRole("admin"),
  updateSubmission
);

router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  deleteSubmission
);

export default router;