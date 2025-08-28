import express from "express";
import upload from "../../middleware/multerMiddleware.js";
import { 
    getAllStories, getStoryById, addStory,
    getAllComments, getCommentById, addComment,
    getAllReplies, getReplyById, addReply,
    getAllAds, getAdById, addAd
} from "../story/story.controller.js";

const router = express.Router();

//  STORIES 
router.get("/", getAllStories);
router.get("/stories/:id", getStoryById);
router.post(
    "/create",
    upload([
        { name: "featuredImage", maxCount: 1 },
    ]),
    addStory
);

//  COMMENTS 
router.get("/comments", getAllComments);
router.get("/comments/:id", getCommentById);
router.post("/comments", addComment);


//  COMMENT REPLIES 
router.get("/replies", getAllReplies);
router.get("/replies/:id", getReplyById);
router.post("/replies", addReply);

//  ADS 
router.get("/ads", getAllAds);
router.get("/ads/:id", getAdById);
router.post("/ads", addAd);

export default router;
