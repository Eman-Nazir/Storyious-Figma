import mongoose from "mongoose";

const authorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shortBio: { type: String, required: true },
    fullBio: { type: String, required: true },
    image: { type: String, required: true },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Author", authorSchema);
