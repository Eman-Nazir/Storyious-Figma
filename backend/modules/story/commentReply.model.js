import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commentReplySchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    showEmail: { type: Boolean, default: true },
    phoneNumber: { type: String, required: true },
    countryCode: { type: String, default: "pk" },
    replyText: { type: String, required: true, trim: true },
    saveDetails: { type: Boolean, default: true },
    agreeTerms: { type: Boolean, default: false },
    isHuman: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    storyId: { type: Schema.Types.ObjectId, ref: "Story" },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog" },
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
    dislikes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }],
  },
  { timestamps: true }
);

export default model("CommentReply", commentReplySchema);