

import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  platform: String,
  icon: String,
  url: { type: String, default: "" },
});

const authorSchema = new mongoose.Schema({
  name: String,
  shortBio: String,
  fullBio: String,
  image: String,
  slug: String,
  isVerified: { type: Boolean, default: true },
  socials: [socialSchema], 
}, { timestamps: true });

// Export as ES Module
const Author = mongoose.model("Author", authorSchema);
export default Author;
