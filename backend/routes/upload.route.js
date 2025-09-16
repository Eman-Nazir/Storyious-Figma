import express from "express";
import Upload from "../middleware_temp/multerMiddleware.js"; 

const router = express.Router();

router.post("/", Upload("stories").single("file"), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const url = req.file.path; 
    res.json({ url }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default router;