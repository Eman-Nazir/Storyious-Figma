import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";
import {
  getAllAuthors,
  getAuthorById,
  addAuthor,
  getAuthorBySlug,
  updateAuthor,
  deleteAuthor,
} from "./author.controller.js";

const router = express.Router();
const upload = Upload("authors");

// Public routes
router.get("/", getAllAuthors);
router.get("/slug/:slug", getAuthorBySlug);
router.get("/:id", getAuthorById);

// Admin routes
router.post(
  "/",
  auth,
  requireRole("admin"),
  upload.single("image"),
  addAuthor
);

router.put(
  "/:id",
  auth,
  requireRole("admin"),
  upload.single("image"),
  updateAuthor
);

router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  deleteAuthor
);

export default router;