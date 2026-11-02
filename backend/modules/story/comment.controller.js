import mongoose from "mongoose";
import Comment from "./comment.model.js";
import CommentReply from "./commentReply.model.js";

// Return only the account ID, never private account details.
const toPublicUser = (user) => {
  if (!user) return null;

  const id = user._id || user;

  return {
    _id: id.toString(),
  };
};

// Explicitly allow only public response fields.
const toPublicFields = (record) => {
  const publicData = {
    _id: record._id,
    name: record.name,
    user: toPublicUser(record.user),
    showEmail: record.showEmail === true,
    likesCount: record.likesCount || 0,
    dislikesCount: record.dislikesCount || 0,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };

  if (publicData.showEmail && typeof record.email === "string") {
    publicData.email = record.email;
  }

  return publicData;
};

const toPublicReply = (reply) => ({
  ...toPublicFields(reply),
  replyText: reply.replyText,
  parentCommentId: reply.parentCommentId,
  storyId: reply.storyId,
  blogId: reply.blogId,
});

const toPublicComment = (comment) => ({
  ...toPublicFields(comment),
  text: comment.text,
  story: comment.story,
  blogId: comment.blogId,
  replies: (comment.replies || [])
    .filter(Boolean)
    .map(toPublicReply),
});

// GET COMMENTS
export const getAllComments = async (req, res) => {
  try {
    const { storyId, blogId } = req.query;
    const query = {};

    if (storyId) query.story = storyId;
    if (blogId) query.blogId = blogId;

    const comments = await Comment.find(query)
      .populate("replies")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: comments.map(toPublicComment),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE COMMENT
export const createComment = async (req, res) => {
  try {
    const {
      text,
      name,
      email,
      showEmail,
      phoneNumber,
      countryCode,
      saveDetails,
      storyId,
      blogId,
    } = req.body;

    const commentData = {
      text,
      name,
      email,
      showEmail: showEmail === true,
      phoneNumber,
      countryCode,
      saveDetails,
    };

    if (req.user) commentData.user = req.user.id;
    if (storyId) commentData.story = storyId;
    if (blogId) commentData.blogId = blogId;

    const comment = new Comment(commentData);
    await comment.save();

    return res.status(201).json({
      success: true,
      data: toPublicComment(comment),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// CREATE REPLY
export const createReply = async (req, res) => {
  try {
    const {
      name,
      email,
      showEmail,
      phoneNumber,
      countryCode,
      replyText,
      saveDetails,
      agreeTerms,
      isHuman,
      parentCommentId,
      storyId,
      blogId,
    } = req.body;

    const replyData = {
      name,
      email,
      showEmail: showEmail === true,
      phoneNumber,
      countryCode,
      replyText,
      saveDetails,
      agreeTerms,
      isHuman,
      parentCommentId,
    };

    if (req.user) replyData.user = req.user.id;
    if (storyId) replyData.storyId = storyId;
    if (blogId) replyData.blogId = blogId;

    const reply = new CommentReply(replyData);
    await reply.save();

    await Comment.findByIdAndUpdate(parentCommentId, {
      $push: {
        replies: reply._id,
      },
    });

    return res.status(201).json({
      success: true,
      data: toPublicReply(reply),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Store the vote and update both totals in one atomic operation.
// Repeating a vote leaves it unchanged.
// Changing direction removes the previous vote.
const voteFor = (
  Model,
  idField,
  direction,
  serialize,
  populateReplies = false
) => {
  return async (req, res) => {
    try {
      const userId = req.user?.id;

      if (
        typeof userId !== "string" ||
        !mongoose.isObjectIdOrHexString(userId)
      ) {
        return res.status(401).json({
          success: false,
          message: "Please log in to vote",
        });
      }

      const id = req.params[idField];

      if (
        typeof id !== "string" ||
        !mongoose.isObjectIdOrHexString(id)
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid comment or reply ID",
        });
      }

      // Mongoose does not cast values inside update pipelines.
      const voterId = new mongoose.Types.ObjectId(userId);

      const likedBy = {
        $ifNull: ["$likedBy", []],
      };

      const dislikedBy = {
        $ifNull: ["$dislikedBy", []],
      };

      const update = [
        {
          $set: {
            likedBy:
              direction === "like"
                ? {
                    $setUnion: [likedBy, [voterId]],
                  }
                : {
                    $setDifference: [likedBy, [voterId]],
                  },

            dislikedBy:
              direction === "dislike"
                ? {
                    $setUnion: [dislikedBy, [voterId]],
                  }
                : {
                    $setDifference: [dislikedBy, [voterId]],
                  },
          },
        },
        {
          $set: {
            likesCount: {
              $size: "$likedBy",
            },
            dislikesCount: {
              $size: "$dislikedBy",
            },
          },
        },
      ];

      let query = Model.findByIdAndUpdate(id, update, {
        new: true,
      });

      if (populateReplies) {
        query = query.populate("replies");
      }

      const record = await query;

      if (!record) {
        return res.status(404).json({
          success: false,
          message:
            idField === "commentId"
              ? "Comment not found"
              : "Reply not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: serialize(record),
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
};

export const likeComment = voteFor(
  Comment,
  "commentId",
  "like",
  toPublicComment,
  true
);

export const dislikeComment = voteFor(
  Comment,
  "commentId",
  "dislike",
  toPublicComment,
  true
);

export const likeReply = voteFor(
  CommentReply,
  "replyId",
  "like",
  toPublicReply
);

export const dislikeReply = voteFor(
  CommentReply,
  "replyId",
  "dislike",
  toPublicReply
);

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    if (
      comment.user?.toString() !== userId &&
      userRole !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await CommentReply.deleteMany({
      _id: {
        $in: comment.replies,
      },
    });

    await Comment.findByIdAndDelete(commentId);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE REPLY
export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;

    const reply = await CommentReply.findById(replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: "Reply not found",
      });
    }

    if (
      reply.user?.toString() !== userId &&
      userRole !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Comment.findByIdAndUpdate(reply.parentCommentId, {
      $pull: {
        replies: replyId,
      },
    });

    await CommentReply.findByIdAndDelete(replyId);

    return res.status(200).json({
      success: true,
      message: "Reply deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};