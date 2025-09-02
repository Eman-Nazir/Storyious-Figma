import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Story from "../story/story.model.js";
import Comment from "../story/comment.model.js";
import CommentReply from "../story/commentReply.model.js";
import Ads from "../story/ad.model.js";
import { calculateReadTime } from "../../utils/readTime.js";




// // ✅ GET ALL STORIES
// export const getAllStories = asyncHandler(async (req, res) => {
//   const stories = await Story.find()
//     .populate("author", "name shortBio")
//     .populate("commentsCount");

//   res.status(200).json(new ApiResponse(200, stories, "Success"));
// });

// // ✅ GET STORY BY ID (increment views)
// export const getStoryById = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id))
//     throw new ApiError(400, "Invalid story ID");

//   // increment views each time story is fetched
//   const story = await Story.findByIdAndUpdate(
//     id,
//     { $inc: { "meta.views": 1 } },
//     { new: true }
//   )
//     .populate("author", "name shortBio")
//     .populate("commentsCount");

//   if (!story) throw new ApiError(404, "Story not found");

//   res.status(200).json(new ApiResponse(200, story, "Success"));
// });

// // ✅ ADD STORY (auto calculate readTime)
// export const addStory = asyncHandler(async (req, res) => {
//   const { title, introText, content, author, category } = req.body;

//   const featuredImage = req.files?.["featuredImage"]
//     ? req.files["featuredImage"][0].filename
//     : "";

//   const readTime = calculateReadTime(content);

//   const newStory = await Story.create({
//     title,
//     introText,
//     content,
//     featuredImage,
//     author,
//     category,
//     meta: { readTime }, // store readTime
//   });

//   const populatedStory = await Story.findById(newStory._id)
//     .populate("author", "name shortBio")
//     .populate("commentsCount");

//   res
//     .status(201)
//     .json(new ApiResponse(201, populatedStory, "Story created successfully"));
// });



// CLOUDINARY 


// ✅ GET ALL STORIES
export const getAllStories = asyncHandler(async (req, res) => {
  const stories = await Story.find()
    .populate("author", "name shortBio")
    .populate("commentsCount");

  res.status(200).json(new ApiResponse(200, stories, "Success"));
});

// ✅ GET STORY BY ID (increment views)
export const getStoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid story ID");

  const story = await Story.findByIdAndUpdate(
    id,
    { $inc: { "meta.views": 1 } },
    { new: true }
  )
    .populate("author", "name shortBio")
    .populate("commentsCount");

  if (!story) throw new ApiError(404, "Story not found");

  res.status(200).json(new ApiResponse(200, story, "Success"));
});

// ✅ ADD STORY (auto calculate readTime + Cloudinary image upload)
export const addStory = asyncHandler(async (req, res) => {
  const { title, introText, content, author, category } = req.body;

  // ✅ Cloudinary gives `req.file.path` as the secure URL
  const featuredImage = req.file?.path || "";

  const readTime = calculateReadTime(content);

  const newStory = await Story.create({
    title,
    introText,
    content,
    featuredImage,
    author,
    category,
    meta: { readTime },
  });

  const populatedStory = await Story.findById(newStory._id)
    .populate("author", "name shortBio")
    .populate("commentsCount");

  res
    .status(201)
    .json(new ApiResponse(201, populatedStory, "Story created successfully"));
});























//  COMMENTS

export const getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find()
    .populate("user", "username email")
    .select("text createdAt user");

  res.status(200).json(new ApiResponse(200, comments));
});

export const getCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid comment ID");

  const comment = await Comment.findById(id)
    .populate("user", "username email")
    .select("text createdAt user");

  if (!comment) throw new ApiError(404, "Comment not found");

  res.status(200).json(new ApiResponse(200, comment));
});

export const addComment = asyncHandler(async (req, res) => {
  const { text, user, story, blogId } = req.body;

  if (!text || !user) {
    throw new ApiError(400, "Text and user are required");
  }

  const newComment = await Comment.create({ text, user, story, blogId });

  const populatedComment = await newComment.populate("user", "username email");

  res.status(201).json(
    new ApiResponse(
      201,
      {
        text: populatedComment.text,
        createdAt: populatedComment.createdAt,
        user: populatedComment.user,
      },
      "Comment added successfully"
    )
  );
});

//  COMMENT REPLIES
export const getAllReplies = asyncHandler(async (req, res) => {
  const replies = await CommentReply.find();
  res.status(200).json(new ApiResponse(200, replies));
});

export const getReplyById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid reply ID");

  const reply = await CommentReply.findById(id);
  if (!reply) throw new ApiError(404, "Reply not found");

  res.status(200).json(new ApiResponse(200, reply));
});

export const addReply = asyncHandler(async (req, res) => {
  const newReply = await CommentReply.create(req.body);
  res
    .status(201)
    .json(new ApiResponse(201, newReply, "Reply added successfully"));
});

//  ADS
export const getAllAds = asyncHandler(async (req, res) => {
  const ads = await Ads.find();
  res.status(200).json(new ApiResponse(200, ads));
});

export const getAdById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid ad ID");

  const ad = await Ads.findById(id);
  if (!ad) throw new ApiError(404, "Ad not found");

  res.status(200).json(new ApiResponse(200, ad));
});

export const addAd = asyncHandler(async (req, res) => {
  const newAd = await Ads.create(req.body);
  res.status(201).json(new ApiResponse(201, newAd, "Ad added successfully"));
});
