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

    parentCommentId: { type: Schema.Types.ObjectId, ref: "Comment", required: true },

    storyId: { type: Schema.Types.ObjectId, ref: "Story" },
    blogId: { type: Schema.Types.ObjectId, ref: "Blog" },
  },
  { timestamps: true }
);

export default model("CommentReply", commentReplySchema);
