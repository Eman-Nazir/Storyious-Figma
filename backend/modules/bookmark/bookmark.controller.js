import mongoose from "mongoose";
import Bookmark from "./bookmark.model.js";
import Story from "../story/story.model.js";
import Blog from "../blogs/blog.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const storyFields =
  "title featuredImage introText author categories meta createdAt type videoUrl";

const blogFields =
  "title introText author meta createdAt cards";

const getContentTarget = ({ storyId, blogId }) => {
  if ((!storyId && !blogId) || (storyId && blogId)) {
    throw new ApiError(400, "Provide either storyId or blogId");
  }

  const type = storyId ? "story" : "blog";
  const contentId = storyId || blogId;

  if (
    typeof contentId !== "string" ||
    !mongoose.Types.ObjectId.isValid(contentId)
  ) {
    throw new ApiError(400, "Invalid content ID");
  }

  return {
    type,
    contentId,
    model: type === "story" ? Story : Blog,
  };
};

const getPositiveInteger = (value, fallback, name) => {
  if (value === undefined) return fallback;

  if (typeof value !== "string" && typeof value !== "number") {
    throw new ApiError(400, `${name} must be a positive integer`);
  }

  const number = Number(value);

  if (!Number.isSafeInteger(number) || number < 1) {
    throw new ApiError(400, `${name} must be a positive integer`);
  }

  return number;
};

export const toggleBookmark = asyncHandler(async (req, res) => {
  const { type, contentId, model } = getContentTarget(req.body);
  const userId = req.user.id;

  const existingBookmark = await Bookmark.findOne({
    user: userId,
    [type]: contentId,
  });

  // Removing an old bookmark remains possible after unpublishing.
  if (existingBookmark) {
    await Bookmark.findOneAndDelete({
      _id: existingBookmark._id,
      user: userId,
    });

    return res.status(200).json(
      new ApiResponse(
        200,
        { bookmarked: false },
        "Bookmark removed successfully"
      )
    );
  }

  const activeContent = await model.exists({
    _id: contentId,
    status: "active",
  });

  if (!activeContent) {
    throw new ApiError(404, "Content not found");
  }

  const newBookmark = await Bookmark.create({
    user: userId,
    [type]: contentId,
    type,
  });

  await newBookmark.populate({
    path: type,
    match: { status: "active" },
    select: type === "story" ? storyFields : blogFields,
  });

  if (!newBookmark[type]) {
    await Bookmark.findOneAndDelete({
      _id: newBookmark._id,
      user: userId,
    });

    throw new ApiError(404, "Content not found");
  }

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        bookmarked: true,
        bookmark: newBookmark,
      },
      "Bookmark added successfully"
    )
  );
});

export const checkBookmarkStatus = asyncHandler(async (req, res) => {
  const { type, contentId, model } = getContentTarget(req.query);
  const userId = req.user.id;

  const activeContent = await model.exists({
    _id: contentId,
    status: "active",
  });

  const bookmark = activeContent
    ? await Bookmark.findOne({
        user: userId,
        [type]: contentId,
      })
    : null;

  return res.status(200).json(
    new ApiResponse(
      200,
      { bookmarked: !!bookmark },
      "Bookmark status checked successfully"
    )
  );
});

export const getUserBookmarks = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { type } = req.query;

  if (type !== undefined && !["story", "blog"].includes(type)) {
    throw new ApiError(400, "Invalid bookmark type");
  }

  const page = getPositiveInteger(req.query.page, 1, "page");
  const limit = Math.min(
    getPositiveInteger(req.query.limit, 20, "limit"),
    100
  );

  const skip = (page - 1) * limit;

  if (!Number.isSafeInteger(skip)) {
    throw new ApiError(400, "Page number is too large");
  }

  const [activeStories, activeBlogs] = await Promise.all([
    type === "blog"
      ? []
      : Story.find({ status: "active" }).select("_id").lean(),
    type === "story"
      ? []
      : Blog.find({ status: "active" }).select("_id").lean(),
  ]);

  const visibleTypes = [];

  if (type !== "blog") {
    visibleTypes.push({
      type: "story",
      story: {
        $in: activeStories.map((story) => story._id),
      },
    });
  }

  if (type !== "story") {
    visibleTypes.push({
      type: "blog",
      blog: {
        $in: activeBlogs.map((blog) => blog._id),
      },
    });
  }

  const filter = {
    user: userId,
    $or: visibleTypes,
  };

  const [bookmarks, total] = await Promise.all([
    Bookmark.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "story",
        match: { status: "active" },
        select: storyFields,
      })
      .populate({
        path: "blog",
        match: { status: "active" },
        select: blogFields,
      }),
    Bookmark.countDocuments(filter),
  ]);

  const visibleBookmarks = bookmarks.filter((bookmark) =>
    bookmark.type === "story"
      ? !!bookmark.story
      : !!bookmark.blog
  );

  const totalPages = Math.ceil(total / limit);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        bookmarks: visibleBookmarks,
        pagination: {
          totalPages,
          currentPage: page,
          total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
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
    user: userId,
  });

  if (!bookmark) {
    throw new ApiError(404, "Bookmark not found");
  }

  return res.status(200).json(
    new ApiResponse(200, null, "Bookmark removed successfully")
  );
});