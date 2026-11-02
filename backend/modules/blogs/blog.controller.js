import mongoose from "mongoose";
import Blog from "../blogs/blog.model.js";
import { calculateReadTime } from "../../utils/readTime.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// Parse and validate every card.
// On partial updates, keep the existing cards when omitted.
const parseCards = (rawCards, fallback = []) => {
  let cards = fallback;

  if (rawCards !== undefined) {
    if (typeof rawCards !== "string") {
      throw new ApiError(400, "Cards must be a JSON array");
    }

    try {
      cards = JSON.parse(rawCards);
    } catch {
      throw new ApiError(400, "Invalid cards JSON");
    }
  }

  if (!Array.isArray(cards)) {
    throw new ApiError(400, "Cards must be an array");
  }

  return cards.map((card) => {
    if (!card || typeof card !== "object" || Array.isArray(card)) {
      throw new ApiError(400, "Each card must be an object");
    }

    return typeof card.toObject === "function"
      ? card.toObject()
      : { ...card };
  });
};

// Assign each uploaded image to its submitted card index.
const assignCardImages = (cards, files, rawIndexes) => {
  let imageCardIndexes;

  try {
    imageCardIndexes = JSON.parse(rawIndexes || "[]");
  } catch {
    throw new ApiError(400, "Invalid image card indexes");
  }

  if (
    !Array.isArray(cards) ||
    !Array.isArray(imageCardIndexes) ||
    imageCardIndexes.length !== files.length
  ) {
    throw new ApiError(400, "Images and card indexes do not match");
  }

  const invalidIndexes =
    new Set(imageCardIndexes).size !== imageCardIndexes.length ||
    imageCardIndexes.some(
      (index) =>
        !Number.isInteger(index) ||
        index < 0 ||
        index >= cards.length ||
        !cards[index] ||
        typeof cards[index] !== "object" ||
        Array.isArray(cards[index])
    );

  if (invalidIndexes) {
    throw new ApiError(400, "Invalid or duplicate image card index");
  }

  const imageUrls = files.map((file) => {
    if (typeof file?.path !== "string" || !file.path) {
      throw new ApiError(400, "Uploaded image URL is missing");
    }

    return file.path;
  });

  imageCardIndexes.forEach((cardIndex, fileIndex) => {
    cards[cardIndex].image = imageUrls[fileIndex];
  });
};

const getAdminStatusFilter = (status) => {
  if (!status || status === "all") return {};

  if (status !== "active" && status !== "inactive") {
    throw new ApiError(400, "Status must be active, inactive, or all");
  }

  return { status };
};

// CREATE BLOG
export const createBlog = asyncHandler(async (req, res) => {
  const { author } = req.body;

  if (!author) {
    throw new ApiError(400, "Author is required");
  }

  const cards = parseCards(req.body.cards);

  assignCardImages(
    cards,
    req.files || [],
    req.body.imageCardIndexes
  );

  const fullContent =
    (req.body.introText || "") +
    " " +
    cards.map((card) => card.description || "").join(" ");

  const readTime = calculateReadTime(fullContent);

  const blog = new Blog({
    title: req.body.title,
    introText: req.body.introText,
    author: req.body.author,
    cards,
    meta: {
      readTime,
      views: 0,
    },
    status: req.body.status || "active",
  });

  await blog.save();
  await blog.populate("author", "name slug image");

  res.status(201).json(
    new ApiResponse(
      201,
      { blog, success: true },
      "Blog created"
    )
  );
});

// PUBLIC: GET ACTIVE BLOGS ONLY
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find({ status: "active" })
    .populate("author", "name slug image")
    .populate("commentsCount");

  res.status(200).json(
    new ApiResponse(200, { blogs, success: true })
  );
});

// PUBLIC: GET AN ACTIVE BLOG
export const getSingleBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid blog ID");
  }

  const blog = await Blog.findOneAndUpdate(
    { _id: id, status: "active" },
    { $inc: { "meta.views": 1 } },
    { new: true }
  )
    .populate("author", "name slug image shortBio socials")
    .populate("commentsCount");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json(
    new ApiResponse(200, { blog, success: true })
  );
});

// ADMIN: GET ALL STATUSES OR FILTER BY STATUS
export const getAdminBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find(
    getAdminStatusFilter(req.query.status)
  )
    .populate("author", "name slug image")
    .populate("commentsCount");

  res.status(200).json(
    new ApiResponse(200, { blogs, success: true })
  );
});

// ADMIN: GET ANY BLOG WITHOUT INCREASING PUBLIC VIEWS
export const getAdminBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid blog ID");
  }

  const blog = await Blog.findById(id)
    .populate("author", "name slug image shortBio socials")
    .populate("commentsCount");

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json(
    new ApiResponse(200, { blog, success: true })
  );
});

// UPDATE BLOG
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  let cards = parseCards(req.body.cards, blog.cards);

  assignCardImages(
    cards,
    req.files || [],
    req.body.imageCardIndexes
  );

  // Keep the previous image when this card has no replacement.
  cards = cards.map((card) => {
    if (!card.image && card.oldImage) {
      card.image = card.oldImage;
    }

    return card;
  });

  blog.title = req.body.title || blog.title;
  blog.introText = req.body.introText || blog.introText;
  blog.author = req.body.author || blog.author;
  blog.cards = cards.length > 0 ? cards : blog.cards;
  blog.status = req.body.status || blog.status;

  const fullContent =
    (blog.introText || "") +
    " " +
    blog.cards.map((card) => card.description || "").join(" ");

  blog.meta.readTime = calculateReadTime(fullContent);

  await blog.save();
  await blog.populate("author", "name slug image");

  res.status(200).json(
    new ApiResponse(
      200,
      { blog, success: true },
      "Blog updated"
    )
  );
});

// DELETE BLOG
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);

  if (!blog) {
    throw new ApiError(404, "Blog not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      { blog, success: true },
      "Blog deleted successfully"
    )
  );
});