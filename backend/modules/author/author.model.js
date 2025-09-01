import mongoose from 'mongoose';

const socialSchema = new mongoose.Schema({
  platform: String, // name of platform (facebook, twitter, etc.)
});

const authorSchema = new mongoose.Schema({
  name: String,
  shortBio: String,
  fullBio: String,
  image: String,
  slug: String,
  isVerified: { type: Boolean, default: false },
  socials: [socialSchema], 
}, { timestamps: true });

const Author = mongoose.model("Author", authorSchema);
export default Author;
