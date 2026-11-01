import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
import {
  auth,
  requireRole,
} from "../../middleware_temp/authMiddleware.js";
import {
  getAllStories,
  getStoryById,
  addStory,
  updateStory,
  deleteStory,
  getAllAds,
  getAdById,
  addAd,
  updateAd,
  deleteAd,
} from "../story/story.controller.js";

const router = express.Router();

const uploadStories = Upload("stories");
const uploadAds = Upload("ads");

// Public ad routes
router.get("/ads", getAllAds);
router.get("/ads/:id", getAdById);

// Admin ad routes
router.post(
  "/ads",
  auth,
  requireRole("admin"),
  uploadAds.single("image"),
  addAd
);

router.put(
  "/ads/:id",
  auth,
  requireRole("admin"),
  uploadAds.single("image"),
  updateAd
);

router.delete(
  "/ads/:id",
  auth,
  requireRole("admin"),
  deleteAd
);

// Public story routes
router.get("/", getAllStories);
router.get("/:id", getStoryById);

// Admin story routes
router.post(
  "/create",
  auth,
  requireRole("admin"),
  uploadStories.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  addStory
);

router.put(
  "/:id",
  auth,
  requireRole("admin"),
  uploadStories.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  updateStory
);

router.delete(
  "/:id",
  auth,
  requireRole("admin"),
  deleteStory
);

export default router;