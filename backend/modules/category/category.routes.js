import express from "express";
import {
  createCategory,
  getCategories,
  getAdminCategories,
  deleteCategory,
  updateCategory,
} from "./category.controller.js";
import Upload from "../../middleware_temp/multerMiddleware.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";

const router = express.Router();
const upload = Upload("categories");

// Public: active categories
router.get("/", getCategories);

// Admin: all statuses
router.get(
  "/admin/all",
  auth,
  requireRole("admin"),
  getAdminCategories
);

router.post(
  "/create",
  auth,
  requireRole("admin"),
  upload.single("image"),
  createCategory
);

router.put(
  "/:id",
  auth,
  requireRole("admin"),
  upload.single("image"),
  updateCategory
);

router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  deleteCategory
);

export default router;