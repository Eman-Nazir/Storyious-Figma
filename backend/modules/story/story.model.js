import mongoose from "mongoose";

const storySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    introText: { type: String },
    content: { type: String },

    type: {
      type: String,
      enum: ["written", "video"],
      default: "written",
    },

    videoFile: { type: String, default: "" }, 
    videoUrl: { type: String, default: "" },  
    meta: {
      type: {
        readTime: { type: String, default: "0" },
        views: { type: Number, default: 0 },
      },
      default: {},
    },

    featuredImage: { type: String, default: "" },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: false,
    },
    
    status: { 
      type: String, 
      enum: ['active', 'inactive'], 
      default: 'active' 
    }
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