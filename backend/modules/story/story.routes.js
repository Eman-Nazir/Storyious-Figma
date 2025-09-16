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
  deleteAd
} from "../story/story.controller.js";

const router = express.Router();

const uploadStories = Upload("stories");
const uploadAds = Upload("ads");

router.get("/ads", getAllAds);                     
router.get("/ads/:id", getAdById);                 
router.post("/ads", uploadAds.single("image"), addAd); 
router.put("/ads/:id", uploadAds.single("image"), updateAd);
router.delete("/ads/:id", deleteAd);

//  STORY ROUTES 
router.get("/", getAllStories);                                             
router.post("/create", uploadStories.single("featuredImage"), addStory);     
router.get("/:id", getStoryById);                                           
router.put("/:id", uploadStories.single("featuredImage"), updateStory);     
router.delete("/:id", deleteStory);                                        

export default router;
