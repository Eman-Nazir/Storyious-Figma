import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    story: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Story",
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
    type: {
      type: String,
      enum: ["story", "blog"],
      required: true,
    },
  },
  { 
    timestamps: true 
  }
);

bookmarkSchema.index({ user: 1, story: 1 }, { 
  unique: true, 
  sparse: true,
  partialFilterExpression: { story: { $ne: null } } 
});

bookmarkSchema.index({ user: 1, blog: 1 }, { 
  unique: true, 
  sparse: true,
  partialFilterExpression: { blog: { $ne: null } } 
});

bookmarkSchema.index({ user: 1, type: 1, story: 1, blog: 1 });

bookmarkSchema.pre('save', function(next) {
  if (!this.story && !this.blog) {
    return next(new Error('Either story or blog must be provided'));
  }
  
  if (this.story && this.blog) {
    return next(new Error('Cannot bookmark both story and blog in the same document'));
  }
  
  this.type = this.story ? 'story' : 'blog';
  next();
});

export default mongoose.model("Bookmark", bookmarkSchema);