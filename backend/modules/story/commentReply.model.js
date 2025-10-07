import mongoose from 'mongoose';

const commentReplySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  showEmail: { type: Boolean, default: true },
  phoneNumber: String,
  countryCode: String,
  replyText: { type: String, required: true },
  saveDetails: { type: Boolean, default: true },
  agreeTerms: { type: Boolean, required: true },
  isHuman: Boolean,
  parentCommentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true },
  storyId: String,
  blogId: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likesCount: { type: Number, default: 0 },
  dislikesCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

export default mongoose.model('CommentReply', commentReplySchema);