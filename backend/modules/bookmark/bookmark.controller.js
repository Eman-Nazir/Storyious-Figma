import mongoose from "mongoose";
import Bookmark from "./bookmark.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";



export const toggleBookmark = asyncHandler(async (req, res) => {
  const { storyId, blogId } = req.body;
  const userId = req.user.id;

  console.log("Toggle bookmark:", { storyId, blogId, userId });

  if (!storyId && !blogId) {
    throw new ApiError(400, "Either storyId or blogId is required");
  }

  const type = storyId ? "story" : "blog";
  const contentId = storyId || blogId;

  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new ApiError(400, "Invalid content ID");
  }

  const existingBookmark = await Bookmark.findOne({
    user: userId,
    [type]: contentId
  });

  if (existingBookmark) {
    await Bookmark.findByIdAndDelete(existingBookmark._id);
    console.log("Bookmark removed");
    
    return res.status(200).json(
      new ApiResponse(200, { bookmarked: false }, "Bookmark removed successfully")
    );
  } else {
    const bookmarkData = {
      user: userId,
      [type]: contentId,
      type: type
    };

    const newBookmark = await Bookmark.create(bookmarkData);
    
    const populateField = type === "story" ? "story" : "blog";
    const selectFields = type === "story" 
      ? "title featuredImage introText author categories meta createdAt type videoUrl"
      : "title introText author meta createdAt cards";
    
    await newBookmark.populate(populateField, selectFields);

    console.log("Bookmark created:", newBookmark._id);

    return res.status(201).json(
      new ApiResponse(
        201, 
        { 
          bookmarked: true, 
          bookmark: newBookmark 
        }, 
        "Bookmark added successfully"
      )
    );
  }
});

export const checkBookmarkStatus = asyncHandler(async (req, res) => {
  const { storyId, blogId } = req.query;
  const userId = req.user.id;

  if (!storyId && !blogId) {
    throw new ApiError(400, "Either storyId or blogId is required");
  }

  const type = storyId ? "story" : "blog";
  const contentId = storyId || blogId;

  if (!mongoose.Types.ObjectId.isValid(contentId)) {
    throw new ApiError(400, "Invalid content ID");
  }

  const bookmark = await Bookmark.findOne({
    user: userId,
    [type]: contentId,
  });

  return res.status(200).json(
    new ApiResponse(
      200, 
      { 
        bookmarked: !!bookmark
      }, 
      "Bookmark status checked successfully"
    )
  );
});

export const getUserBookmarks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { type, page = 1, limit = 20 } = req.query;

  const filter = { user: userId };
  if (type && ["story", "blog"].includes(type)) {
    filter.type = type;
  }

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },
  };

  const bookmarks = await Bookmark.find(filter)
    .sort(options.sort)
    .skip((options.page - 1) * options.limit)
    .limit(options.limit)
    .populate('story', 'title featuredImage introText author categories meta createdAt type videoUrl')
    .populate('blog', 'title introText author meta createdAt cards featuredImage');

  const total = await Bookmark.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        bookmarks,
        pagination: {
          totalPages: Math.ceil(total / options.limit),
          currentPage: options.page,
          total,
          hasNext: options.page < Math.ceil(total / options.limit),
          hasPrev: options.page > 1,
        },
      },
      "Bookmarks fetched successfully"
    )
  );
});

export const removeBookmark = asyncHandler(async (req, res) => {
  const { bookmarkId } = req.params;
  const userId = req.user.id;

  if (!mongoose.Types.ObjectId.isValid(bookmarkId)) {
    throw new ApiError(400, "Invalid bookmark ID");
  }

  const bookmark = await Bookmark.findOneAndDelete({
    _id: bookmarkId,
    user: userId
  });

  if (!bookmark) {
    throw new ApiError(404, "Bookmark not found");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Bookmark removed successfully")
  );
});




