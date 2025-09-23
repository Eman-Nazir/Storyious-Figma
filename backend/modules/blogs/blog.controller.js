import Blog from "../blogs/blog.model.js";
import { calculateReadTime } from "../../utils/readTime.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createBlog = asyncHandler(async (req, res) => {
  let cards = [];
  if (req.body.cards) {
    try {
      cards = JSON.parse(req.body.cards);
    } catch {
      throw new ApiError(400, "Invalid cards JSON");
    }
  }

  if (req.files && req.files.length > 0) {
    req.files.forEach((file, index) => {
      if (cards[index]) cards[index].image = file.path; 
    });
  }

  const fullContent =
    (req.body.introText || "") + " " + cards.map(c => c.description || "").join(" ");
  const readTime = calculateReadTime(fullContent);

  const blog = new Blog({
    title: req.body.title,
    introText: req.body.introText,
    cards,
    meta: { readTime, views: 0 },
    status: req.body.status || 'active'
  });

  await blog.save();

  res.status(201).json(new ApiResponse(201, { blog, success: true }, "Blog created"));
});

// GET ALL BLOGS
export const getBlogs = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};
  
  if (status) {
    filter.status = status;
  }
  
  const blogs = await Blog.find(filter).populate("commentsCount");
  res.status(200).json(new ApiResponse(200, { blogs, success: true }));
});

// GET SINGLE BLOG
export const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("commentsCount");
  if (!blog) throw new ApiError(404, "Blog not found");

  blog.meta.views += 1;
  await blog.save();

  res.status(200).json(new ApiResponse(200, { blog, success: true }));
});

// UPDATE BLOG
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  let cards = [];
  if (req.body.cards) {
    try {
      cards = JSON.parse(req.body.cards);
    } catch {
      throw new ApiError(400, "Invalid cards JSON");
    }
  }

  if (req.files && req.files.length > 0) {
    req.files.forEach((file, index) => {
      if (cards[index]) cards[index].image = file.path;
    });
  }

  cards = cards.map((card) => {
    if (!card.image && card.oldImage) card.image = card.oldImage;
    return card;
  });

  const fullContent =
    (req.body.introText || "") + " " + cards.map(c => c.description || "").join(" ");
  const readTime = calculateReadTime(fullContent);

  blog.title = req.body.title || blog.title;
  blog.introText = req.body.introText || blog.introText;
  blog.cards = cards.length > 0 ? cards : blog.cards;
  blog.meta.readTime = readTime;
  blog.status = req.body.status || blog.status;

  await blog.save();

  res.status(200).json(new ApiResponse(200, { blog, success: true }, "Blog updated"));
});

// DELETE BLOG
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  res.status(200).json(new ApiResponse(200, { blog, success: true }, "Blog deleted successfully"));
});