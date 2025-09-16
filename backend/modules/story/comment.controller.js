import Comment from "../story/comment.model.js";
import CommentReply from "../story/commentReply.model.js";

// Get all comments for a story or blog
export const getAllComments = async (req, res) => {
  try {
    const { storyId, blogId } = req.query;
    let query = {};
    
    if (storyId) query.story = storyId;
    if (blogId) query.blogId = blogId;
    
    const comments = await Comment.find(query)
      .populate("user", "name email")
      .populate({
        path: "replies",
        populate: {
          path: "user",
          select: "name email"
        }
      })
      .sort({ createdAt: -1 });
    
    res.status(200).json({ success: true, data: comments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create a new comment
export const createComment = async (req, res) => {
  try {
    const { text, name, email, showEmail, phoneNumber, countryCode, saveDetails, storyId, blogId } = req.body;
    
    const commentData = {
      text,
      name,
      email,
      showEmail,
      phoneNumber,
      countryCode,
      saveDetails
    };
    
    if (req.user) {
      commentData.user = req.user.id;
    }
    
    if (storyId) commentData.story = storyId;
    if (blogId) commentData.blogId = blogId;
    
    const comment = new Comment(commentData);
    await comment.save();
    
    await comment.populate("user", "name email");
    
    res.status(201).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createReply = async (req, res) => {
  try {
    const { 
      name, email, showEmail, phoneNumber, countryCode, 
      replyText, saveDetails, agreeTerms, isHuman, 
      parentCommentId, storyId, blogId 
    } = req.body;
    
    const replyData = {
      name,
      email,
      showEmail,
      phoneNumber,
      countryCode,
      replyText,
      saveDetails,
      agreeTerms,
      isHuman,
      parentCommentId
    };
    
    if (req.user) {
      replyData.user = req.user.id;
    }
    
    if (storyId) replyData.storyId = storyId;
    if (blogId) replyData.blogId = blogId;
    
    const reply = new CommentReply(replyData);
    await reply.save();
    
    // Add reply to parent comment
    await Comment.findByIdAndUpdate(
      parentCommentId,
      { $push: { replies: reply._id } }
    );
    
    res.status(201).json({ success: true, data: reply });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Like a comment
export const likeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Please login to like" });
    }
    
    if (comment.likes.includes(userId)) {
      comment.likes.pull(userId);
    } else {
      comment.likes.push(userId);
      comment.dislikes.pull(userId);
    }
    
    await comment.save();
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Dislike a comment
export const dislikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Please login to dislike" });
    }
    
    if (comment.dislikes.includes(userId)) {
      comment.dislikes.pull(userId);
    } else {
      comment.dislikes.push(userId);
      comment.likes.pull(userId);
    }
    
    await comment.save();
    res.status(200).json({ success: true, data: comment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Like a reply
export const likeReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const userId = req.user?.id;
    
    const reply = await CommentReply.findById(replyId);
    
    if (!reply) {
      return res.status(404).json({ success: false, message: "Reply not found" });
    }
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Please login to like" });
    }
    
    if (reply.likes.includes(userId)) {
      reply.likes.pull(userId);
    } else {
      reply.likes.push(userId);
      reply.dislikes.pull(userId);
    }
    
    await reply.save();
    res.status(200).json({ success: true, data: reply });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Dislike a reply
export const dislikeReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const userId = req.user?.id;
    
    const reply = await CommentReply.findById(replyId);
    
    if (!reply) {
      return res.status(404).json({ success: false, message: "Reply not found" });
    }
    
    if (!userId) {
      return res.status(401).json({ success: false, message: "Please login to dislike" });
    }
    
    if (reply.dislikes.includes(userId)) {
      reply.dislikes.pull(userId);
    } else {
      reply.dislikes.push(userId);
      reply.likes.pull(userId);
    }
    
    await reply.save();
    res.status(200).json({ success: true, data: reply });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a comment 
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;
    
    const comment = await Comment.findById(commentId);
    
    if (!comment) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }
    
    if (comment.user?.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    
    
    await CommentReply.deleteMany({ _id: { $in: comment.replies } });
    
    await Comment.findByIdAndDelete(commentId);
    
    res.status(200).json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a reply 
export const deleteReply = async (req, res) => {
  try {
    const { replyId } = req.params;
    const userId = req.user?.id;
    const userRole = req.user?.role;
    
    const reply = await CommentReply.findById(replyId);
    
    if (!reply) {
      return res.status(404).json({ success: false, message: "Reply not found" });
    }
    
    if (reply.user?.toString() !== userId && userRole !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }
    
    await Comment.findByIdAndUpdate(
      reply.parentCommentId,
      { $pull: { replies: replyId } }
    );
    
    // Delete the reply
    await CommentReply.findByIdAndDelete(replyId);
    
    res.status(200).json({ success: true, message: "Reply deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};