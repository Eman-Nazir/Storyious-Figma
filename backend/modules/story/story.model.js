


import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introText: { type: String },
    content: { type: String },
    meta: {
      readTime: { type: String, default: "" },
      views: { type: Number, default: 0 },
    },
    featuredImage: { type: String, default: "" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },

  

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  },
  { timestamps: true }
);

storySchema.virtual("commentsCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "story",
  count: true, 
});

storySchema.set("toObject", { virtuals: true });
storySchema.set("toJSON", { virtuals: true });

const Story = mongoose.model("Story", storySchema);
export default Story;
