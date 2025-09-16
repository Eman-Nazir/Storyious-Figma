import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    introText: { type: String, trim: true },
    cards: [
      {
        title: { type: String, required: true, trim: true },
        image: { type: String, trim: true }, 
        subtitle: { type: String, trim: true },
        description: { type: String, trim: true },
        button_text: { type: String, trim: true },
        button_link: { type: String, trim: true },
      },
    ],
    meta: {
      type: {
        readTime: { type: String, default: "0 min" },
        views: { type: Number, default: 0 },
      },
      default: {},
    },
  },
  { timestamps: true }
);

// Virtual for comments count
blogSchema.virtual("commentsCount", {
  ref: "Comment",
  localField: "_id",
  foreignField: "blogId",
  count: true,
});

blogSchema.set("toObject", { virtuals: true });
blogSchema.set("toJSON", { virtuals: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
