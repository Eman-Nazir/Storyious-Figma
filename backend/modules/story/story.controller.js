import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Story from "../story/story.model.js";
import Ads from "../story/ad.model.js";
import { calculateReadTime } from "../../utils/readTime.js";

const getAdminStatusFilter = (status) => {
  if (!status || status === "all") return {};

  if (status !== "active" && status !== "inactive") {
    throw new ApiError(400, "Status must be active, inactive, or all");
  }

  return { status };
};

// Public: always return active stories only.
export const getAllStories = asyncHandler(async (req, res) => {
  const stories = await Story.find({ status: "active" })
    .populate("author", "name shortBio image slug")
    .populate({
      path: "categories",
      select: "name",
      match: { status: "active" },
    })
    .populate("commentsCount");

  res.status(200).json(new ApiResponse(200, stories, "Success"));
});

// Public: an inactive story behaves like a missing story.
export const getStoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid story ID");
  }

  const story = await Story.findOneAndUpdate(
    { _id: id, status: "active" },
    { $inc: { "meta.views": 1 } },
    { new: true }
  )
    .populate("author", "name shortBio image slug")
    .populate({
      path: "categories",
      select: "name",
      match: { status: "active" },
    })
    .populate("commentsCount");

  if (!story) {
    throw new ApiError(404, "Story not found");
  }

  res.status(200).json(new ApiResponse(200, story, "Success"));
});

// Admin: list all statuses or filter by status.
export const getAdminStories = asyncHandler(async (req, res) => {
  const stories = await Story.find(getAdminStatusFilter(req.query.status))
    .populate("author", "name shortBio image slug")
    .populate("categories", "name")
    .populate("commentsCount");

  res.status(200).json(new ApiResponse(200, stories, "Success"));
});

// Admin: read any story without increasing public views.
export const getAdminStoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid story ID");
  }

  const story = await Story.findById(id)
    .populate("author", "name shortBio image slug")
    .populate("categories", "name")
    .populate("commentsCount");

  if (!story) {
    throw new ApiError(404, "Story not found");
  }

  res.status(200).json(new ApiResponse(200, story, "Success"));
});

// Create story.
export const addStory = asyncHandler(async (req, res) => {
  const {
    title,
    introText,
    content,
    author,
    categories,
    type,
    videoUrl,
    status,
  } = req.body;

  const featuredImage = req.files?.featuredImage?.[0]?.path || "";
  const videoFile = req.files?.videoFile?.[0]?.path || "";
  const readTime = calculateReadTime(content);

  const newStory = await Story.create({
    title,
    introText,
    content,
    featuredImage,
    author,
    categories: categories ? JSON.parse(categories) : [],
    type: type || "written",
    videoFile,
    videoUrl,
    status: status || "active",
    meta: { readTime },
  });

  const populatedStory = await Story.findById(newStory._id)
    .populate("author", "name shortBio image slug")
    .populate("categories", "name")
    .populate("commentsCount");

  res.status(201).json(
    new ApiResponse(
      201,
      populatedStory,
      "Story created successfully"
    )
  );
});

// Update story.
export const updateStory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const {
    title,
    introText,
    content,
    author,
    categories,
    type,
    videoUrl,
    status,
  } = req.body;

  const story = await Story.findById(id);

  if (!story) {
    throw new ApiError(404, "Story not found");
  }

  story.title = title;
  story.introText = introText;
  story.content = content;
  story.author = author;
  story.categories = categories ? JSON.parse(categories) : [];
  story.type = type || "written";
  story.videoUrl = videoUrl || "";
  story.status = status || story.status;

  if (req.files?.featuredImage?.[0]) {
    story.featuredImage = req.files.featuredImage[0].path;
  }

  if (req.files?.videoFile?.[0]) {
    story.videoFile = req.files.videoFile[0].path;
  }

  story.meta.readTime = calculateReadTime(content);

  await story.save();

  const populatedStory = await Story.findById(story._id)
    .populate("author", "name shortBio image slug")
    .populate("categories", "name")
    .populate("commentsCount");

  res.status(200).json(
    new ApiResponse(
      200,
      populatedStory,
      "Story updated successfully"
    )
  );
});

// Delete story.
export const deleteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    throw new ApiError(404, "Story not found");
  }

  await story.deleteOne();

  res.status(200).json(
    new ApiResponse(200, null, "Story deleted successfully")
  );
});

// Create advertisement.
export const addAd = async (req, res) => {
  try {
    const { title, description, buttonText } = req.body;

    // Cloudinary provides the uploaded image URL in file.path.
    const imageUrl = req.file ? req.file.path : null;

    const newAd = new Ads({
      title,
      description,
      buttonText,
      imageUrl,
    });

    await newAd.save();

    res.status(201).json({
      success: true,
      data: newAd,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get all advertisements.
export const getAllAds = async (req, res) => {
  try {
    const ads = await Ads.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: ads,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Get advertisement by ID.
export const getAdById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);

    if (!ad) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.json({
      success: true,
      data: ad,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Update advertisement.
export const updateAd = async (req, res) => {
  try {
    const { title, description, buttonText } = req.body;

    const updateData = {
      title,
      description,
      buttonText,
    };

    // Replace the URL only when a new image is uploaded.
    if (req.file) {
      updateData.imageUrl = req.file.path;
    }

    const updatedAd = await Ads.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedAd) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.json({
      success: true,
      data: updatedAd,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete advertisement.
export const deleteAd = async (req, res) => {
  try {
    const deletedAd = await Ads.findByIdAndDelete(req.params.id);

    if (!deletedAd) {
      return res.status(404).json({
        success: false,
        message: "Ad not found",
      });
    }

    res.json({
      success: true,
      message: "Ad deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};