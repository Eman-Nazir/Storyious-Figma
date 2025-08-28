import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
