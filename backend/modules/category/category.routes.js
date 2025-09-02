

import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "./category.controller.js";
import Upload from "../../middleware_temp/multerMiddleware.js";

const router = express.Router();

// 📂 Cloudinary/categories folder
const upload = Upload("categories");

// CREATE category with image upload
router.post("/create", upload.single("image"), createCategory);

// GET all categories
router.get("/", getCategories);

// DELETE category by ID
router.delete("/:id", deleteCategory);

// UPDATE category with optional image upload
router.put("/:id", upload.single("image"), updateCategory);

export default router;
