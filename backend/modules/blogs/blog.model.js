import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    introText: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author", 
      required: true,
    },

   
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
