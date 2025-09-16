
import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String },
  city: { type: String },
  country: { type: String },
  qualification: { type: String },
  institution: { type: String },
  profession: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  about: { type: String },
  reason: { type: String },
  file: { type: String },
}, { timestamps: true });

export default mongoose.model("Submission", submissionSchema);
