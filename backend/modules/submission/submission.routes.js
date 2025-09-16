
import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js"; 
import { addSubmission, getAllSubmissions } from "./submission.controller.js";

const router = express.Router();

router.post("/create", Upload("submissions").single("file"), addSubmission);
router.get("/", getAllSubmissions);

export default router;
