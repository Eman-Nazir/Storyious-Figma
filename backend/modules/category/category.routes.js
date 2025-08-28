import express from "express";
import {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} from "./category.controller.js";
import upload from "../../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/create", upload([{ name: "image", maxCount: 1 }]), createCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);
router.put("/:id", upload([{ name: "image", maxCount: 1 }]), updateCategory);

export default router;
