import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    showEmail: {
      type: Boolean,
      default: false
    },
    phoneNumber: {
      type: String
    },
    countryCode: {
      type: String,
      default: "pk"
    },
    saveDetails: {
      type: Boolean,
      default: false
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    dislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    replies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "CommentReply",
    }],
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);