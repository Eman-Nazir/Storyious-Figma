import express from "express";
import {
  getAllComments,
  createComment,
  createReply,
  likeComment,
  dislikeComment,
  likeReply,
  dislikeReply,
  deleteComment,
  deleteReply
} from "../story/comment.controller.js";
import { auth } from "../../middleware_temp/authMiddleware.js";

const router = express.Router();

router.get("/", getAllComments);
router.post("/", createComment); 
router.post("/reply", createReply); 

router.put("/like/:commentId", auth, likeComment);
router.put("/dislike/:commentId", auth, dislikeComment);
router.put("/reply/like/:replyId", auth, likeReply);
router.put("/reply/dislike/:replyId", auth, dislikeReply);

router.delete("/:commentId", auth, deleteComment);
router.delete("/reply/:replyId", auth, deleteReply);

export default router;