import express from "express";
import Upload from "../middleware_temp/multerMiddleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = express.Router();


const uploadFile = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  let fileUrl = req.file.path;

  if (req.file.mimetype.startsWith("video/")) {
    fileUrl = fileUrl.replace("/upload/", "/upload/f_auto,q_auto/");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { url: fileUrl }, "File uploaded successfully"));
});


router.post("/image", Upload("editor").single("file"), uploadFile);

router.post("/video", Upload("videos").single("file"), uploadFile);


export default router;
