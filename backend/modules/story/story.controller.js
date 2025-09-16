import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Story from "../story/story.model.js";
import Ads from "../story/ad.model.js";
import { calculateReadTime } from "../../utils/readTime.js";

export const getAllStories = asyncHandler(async (req, res) => {
  const stories = await Story.find()
    .populate("author", "name shortBio")
    .populate("category", "name")
    .populate("commentsCount");

  res.status(200).json(new ApiResponse(200, stories, "Success"));
});

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
    .populate("category", "name")
    .populate("commentsCount");

  if (!story) throw new ApiError(404, "Story not found");

  res.status(200).json(new ApiResponse(200, story, "Success"));
});

export const addStory = asyncHandler(async (req, res) => {
  const { title, introText, content, author, category } = req.body;

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
    .populate("category", "name")
    .populate("commentsCount");

  res
    .status(201)
    .json(new ApiResponse(201, populatedStory, "Story created successfully"));
});

export const updateStory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, introText, content, author, category } = req.body;
  const featuredImage = req.file?.path;

  const story = await Story.findById(id);
  if (!story) throw new ApiError(404, "Story not found");

  story.title = title;
  story.introText = introText;
  story.content = content;
  story.author = author;
  story.category = category;
  story.meta.readTime = calculateReadTime(content);
  if (featuredImage) story.featuredImage = featuredImage;

  await story.save();

  const populatedStory = await Story.findById(story._id)
    .populate("author", "name shortBio")
    .populate("category", "name")
    .populate("commentsCount");

  res
    .status(200)
    .json(new ApiResponse(200, populatedStory, "Story updated successfully"));
});

export const deleteStory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const story = await Story.findById(id);
  if (!story) throw new ApiError(404, "Story not found");

  await story.deleteOne();
  res.status(200).json(new ApiResponse(200, null, "Story deleted successfully"));
});



// Create Ad
export const addAd = async (req, res) => {
  try {
    const { title, description, buttonText } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newAd = new Ads({ title, description, buttonText, imageUrl });
    await newAd.save();

    res.status(201).json({ success: true, data: newAd });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get All Ads
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ads.find().sort({ createdAt: -1 });
    res.json({ success: true, data: ads });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get Ad by ID
export const getAdById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (!ad) return res.status(404).json({ success: false, message: "Ad not found" });
    res.json({ success: true, data: ad });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update Ad
export const updateAd = async (req, res) => {
  try {
    const { title, description, buttonText } = req.body;
    const updateData = { title, description, buttonText };

    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedAd = await Ads.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedAd) return res.status(404).json({ success: false, message: "Ad not found" });
    res.json({ success: true, data: updatedAd });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete Ad
export const deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ads.findByIdAndDelete(req.params.id);
    if (!deletedAd) return res.status(404).json({ success: false, message: "Ad not found" });
    res.json({ success: true, message: "Ad deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
