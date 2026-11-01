import express from "express";
import {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
  getSingleBlog,
} from "../blogs/blog.controller.js";
import Upload from "../../middleware_temp/multerMiddleware.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";

const router = express.Router();
const upload = Upload("blogs");

// Public blog routes
router.get("/", getBlogs);
router.get("/:id", getSingleBlog);

// Admin blog routes
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