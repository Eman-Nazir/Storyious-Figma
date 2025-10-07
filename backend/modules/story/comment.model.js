import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  showEmail: { type: Boolean, default: true },
  phoneNumber: String,
  countryCode: String,
  saveDetails: { type: Boolean, default: true },
  story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' },
  blogId: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CommentReply' }]
}, {
  timestamps: true
});

export default mongoose.model('Comment', commentSchema);