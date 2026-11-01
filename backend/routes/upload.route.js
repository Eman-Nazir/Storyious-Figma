import express from "express";
import Upload from "../middleware_temp/multerMiddleware.js";
import {
  auth,
  requireRole,
} from "../middleware_temp/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  auth,
  requireRole("admin"),
  Upload("stories").single("file"),
  (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      return res.json({
        url: req.file.path,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Upload failed",
      });
    }
  }
);

export default router;