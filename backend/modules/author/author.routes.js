


import express from "express";
import Upload from "../../middleware/multerMiddleware.js";
import {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  updateAuthor,
  deleteAuthor,
} from "./author.controller.js";

const router = express.Router();

// Multer with Cloudinary storage
const upload = Upload("authors"); // all images go to Cloudinary folder "authors"

// ✅ Get all authors
router.get("/", getAllAuthors);

// ✅ Get author by ID
router.get("/:id", getAuthorById);

// ✅ Add a new author (with image upload)
router.post("/", upload.single("image"), addAuthor);

// ✅ Update author by ID (with optional image upload)
router.put("/:id", upload.single("image"), updateAuthor);

// ✅ Delete author by ID
router.delete("/:id", deleteAuthor);

export default router;
