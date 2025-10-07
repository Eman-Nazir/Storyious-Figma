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

router.post("/", auth, createComment);
router.post("/reply", auth, createReply);
router.delete("/:commentId", auth, deleteComment);
router.delete("/reply/:replyId", auth, deleteReply);

router.put("/like/:commentId", likeComment);
router.put("/dislike/:commentId", dislikeComment);
router.put("/reply/like/:replyId", likeReply);
router.put("/reply/dislike/:replyId", dislikeReply);

export default router;