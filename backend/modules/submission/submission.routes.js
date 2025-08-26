import express from "express";
import multer from "multer";
import { addSubmission, getAllSubmissions } from "./submission.controller.js";


const router = express.Router();

// File upload 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
router.post("/create", upload.single("file"), addSubmission);
router.get("/", getAllSubmissions);

export default router;
