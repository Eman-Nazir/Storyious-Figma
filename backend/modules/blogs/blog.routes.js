import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
  getAdminBlogs,
  getAdminBlogById,
} from "./blog.controller.js";
import Upload from "../../middleware_temp/multerMiddleware.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";

const router = express.Router();
const upload = Upload("blogs");

// Admin reads must come before public /:id.
router.get(
  "/admin/all",
  auth,
  requireRole("admin"),
  getAdminBlogs
);

router.get(
  "/admin/:id",
  auth,
  requireRole("admin"),
  getAdminBlogById
);

// Public reads
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);

// Admin management
router.post(
  "/",
  auth,
  requireRole("admin"),
  upload.array("images"),
  createBlog
);

router.put(
  "/:id",
  auth,
  requireRole("admin"),
  upload.array("images"),
  updateBlog
);

router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  deleteBlog
);

export default router;