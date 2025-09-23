import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "general", 
        "scary", 
        "moral", 
        "fairytales", 
        "fables", 
        "classic", 
        "bedtime",
        "competitive-exams"   
      ],
      default: "general"
    },
    slug: {
      type: String,
      unique: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model("FAQ", faqSchema);
