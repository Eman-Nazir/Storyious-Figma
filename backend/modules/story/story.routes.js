import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
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

// Ads Routes
router.get("/ads", getAllAds);
router.get("/ads/:id", getAdById);
router.post("/ads", uploadAds.single("image"), addAd);
router.put("/ads/:id", uploadAds.single("image"), updateAd);
router.delete("/ads/:id", deleteAd);

// Story Routes
router.get("/", getAllStories);
router.post(
  "/create",
  uploadStories.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  addStory
);
router.get("/:id", getStoryById);
router.put(
  "/:id",
  uploadStories.fields([
    { name: "featuredImage", maxCount: 1 },
    { name: "videoFile", maxCount: 1 },
  ]),
  updateStory
);
router.delete("/:id", deleteStory);

export default router;