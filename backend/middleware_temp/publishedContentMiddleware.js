import mongoose from "mongoose";
import Story from "../modules/story/story.model.js";
import Blog from "../modules/blogs/blog.model.js";
import Comment from "../modules/story/comment.model.js";
import CommentReply from "../modules/story/commentReply.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const validateId = (id, label) => {
  if (
    typeof id !== "string" ||
    !mongoose.Types.ObjectId.isValid(id)
  ) {
    throw new ApiError(400, "Invalid " + label);
  }
};

const getRequestedParent = (source = {}) => {
  const hasStory = source.storyId !== undefined;
  const hasBlog = source.blogId !== undefined;

  if (hasStory === hasBlog) {
    throw new ApiError(
      400,
      "Provide exactly one storyId or blogId"
    );
  }

  const type = hasStory ? "story" : "blog";
  const id = hasStory ? source.storyId : source.blogId;

  validateId(id, type + " ID");

  return { type, id };
};

const getCommentParent = (comment) => {
  const hasStory = Boolean(comment.story);
  const hasBlog = Boolean(comment.blogId);

  if (hasStory === hasBlog) {
    throw new ApiError(404, "Comment not found");
  }

  const type = hasStory ? "story" : "blog";
  const id = (
    hasStory ? comment.story : comment.blogId
  ).toString();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(404, "Comment not found");
  }

  return { type, id };
};

const requireActiveParent = async ({ type, id }) => {
  const Model = type === "story" ? Story : Blog;

  const published = await Model.exists({
    _id: id,
    status: "active",
  });

  if (!published) {
    throw new ApiError(404, "Content not found");
  }
};

const findCommentParent = async (commentId) => {
  const comment = await Comment.findById(commentId).select(
    "story blogId"
  );

  if (!comment) {
    throw new ApiError(404, "Comment not found");
  }

  return {
    comment,
    parent: getCommentParent(comment),
  };
};

export const requirePublishedParent = (source) =>
  asyncHandler(async (req, res, next) => {
    const parent = getRequestedParent(req[source]);

    await requireActiveParent(parent);
    next();
  });

export const requirePublishedReplyParent = asyncHandler(
  async (req, res, next) => {
    validateId(req.body?.parentCommentId, "parent comment ID");

    const { comment, parent } = await findCommentParent(
      req.body.parentCommentId
    );

    await requireActiveParent(parent);

    // Use the saved parent comment instead of trusting client IDs.
    delete req.body.storyId;
    delete req.body.blogId;

    req.body.parentCommentId = comment._id.toString();

    if (parent.type === "story") {
      req.body.storyId = parent.id;
    } else {
      req.body.blogId = parent.id;
    }

    next();
  }
);

export const requirePublishedCommentForVote = asyncHandler(
  async (req, res, next) => {
    validateId(req.params.commentId, "comment ID");

    const { parent } = await findCommentParent(
      req.params.commentId
    );

    await requireActiveParent(parent);
    next();
  }
);

export const requirePublishedReplyForVote = asyncHandler(
  async (req, res, next) => {
    validateId(req.params.replyId, "reply ID");

    const reply = await CommentReply.findById(
      req.params.replyId
    ).select("parentCommentId");

    if (!reply || !reply.parentCommentId) {
      throw new ApiError(404, "Reply not found");
    }

    const { parent } = await findCommentParent(
      reply.parentCommentId
    );

    await requireActiveParent(parent);
    next();
  }
);