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
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required:false
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentReply",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Comment", commentSchema);



