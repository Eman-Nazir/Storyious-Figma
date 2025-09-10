import express from "express";
import Upload from "../../middleware_temp/multerMiddleware.js";
import { 
    getAllStories, getStoryById, addStory,
   updateStory,
   deleteStory,
    getAllComments, getCommentById, addComment,
    getAllReplies, getReplyById, addReply,
    getAllAds, getAdById, addAd
} from "../story/story.controller.js";

const router = express.Router();


const upload = Upload("stories");

router.get("/", getAllStories);
router.get("/:id", getStoryById);

router.post("/create", upload.single("featuredImage"), addStory);
router.put("/:id", upload.single("featuredImage"), updateStory);
router.delete("/:id", deleteStory);



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
