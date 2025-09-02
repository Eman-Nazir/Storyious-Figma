import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "./category.controller.js";
import Upload from "../../middleware_temp/multerMiddleware.js";

const router = express.Router();

const upload = Upload("categories");

router.post("/create", upload.single("image"), createCategory);

router.get("/", getCategories);

router.delete("/:id", deleteCategory);

router.put("/:id", upload.single("image"), updateCategory);

export default router;
