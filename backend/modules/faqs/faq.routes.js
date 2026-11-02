import express from "express";
import {
  getAllFAQs,
  getFAQsByCategory,
  getFAQBySlug,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  getFAQCategories,
} from "./faq.controller.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllFAQs);
router.get("/categories", getFAQCategories);
router.get("/category/:category", getFAQsByCategory);
router.get("/:slug", getFAQBySlug);

// Admin routes
router.post(
  "/",
  auth,
  requireRole("admin"),
  createFAQ
);

router.put(
  "/:id",
  auth,
  requireRole("admin"),
  updateFAQ
);

router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  deleteFAQ
);

export default router;