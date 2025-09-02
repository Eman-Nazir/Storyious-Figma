import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introText: { type: String },
    content: { type: String },
    meta: {
  type: {
    readTime: { type: String, default: "0" },
    views: { type: Number, default: 0 },
  },
  default: {}, 
},

    featuredImage: { type: String, default: "" },

    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category",
      required: false  
    },

    
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: false
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
