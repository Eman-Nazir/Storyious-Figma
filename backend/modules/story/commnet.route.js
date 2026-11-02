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
  deleteReply,
} from "./comment.controller.js";

import { auth } from "../../middleware_temp/authMiddleware.js";

import {
  requirePublishedParent,
  requirePublishedReplyParent,
  requirePublishedCommentForVote,
  requirePublishedReplyForVote,
} from "../../middleware_temp/publishedContentMiddleware.js";

const router = express.Router();

// Public comments are available only for published content.
router.get(
  "/",
  requirePublishedParent("query"),
  getAllComments
);

// Creating comments and replies requires authentication.
router.post(
  "/",
  auth,
  requirePublishedParent("body"),
  createComment
);

router.post(
  "/reply",
  auth,
  requirePublishedReplyParent,
  createReply
);

// Owners and admins can delete their permitted records,
// including records attached to unpublished content.
router.delete(
  "/reply/:replyId",
  auth,
  deleteReply
);

router.delete(
  "/:commentId",
  auth,
  deleteComment
);

// Authentication runs before checking the content or changing votes.
router.put(
  "/like/:commentId",
  auth,
  requirePublishedCommentForVote,
  likeComment
);

router.put(
  "/dislike/:commentId",
  auth,
  requirePublishedCommentForVote,
  dislikeComment
);

router.put(
  "/reply/like/:replyId",
  auth,
  requirePublishedReplyForVote,
  likeReply
);

router.put(
  "/reply/dislike/:replyId",
  auth,
  requirePublishedReplyForVote,
  dislikeReply
);

export default router;