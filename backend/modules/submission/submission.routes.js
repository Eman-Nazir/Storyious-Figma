import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
import { addSubmission, getAllSubmissions } from "./submission.controller.js";

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

router.get("/", getAllSubmissions);

export default router;
