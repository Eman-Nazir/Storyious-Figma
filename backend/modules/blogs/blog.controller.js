
import Blog from "../blogs/blog.model.js";
import { calculateReadTime } from "../../utils/readTime.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
// Create blog
export const createBlog = asyncHandler(async (req, res) => {
  let cards = [];
  if (req.body.cards) {
    try {
      cards = JSON.parse(req.body.cards);
    } catch (err) {
      throw new ApiError(400, "Invalid cards JSON");
    }
  }

  if (req.files && req.files.length > 0) {
    req.files.forEach((file, index) => {
      if (cards[index]) cards[index].image = file.path;
    });
  }

  const fullContent = (req.body.introText || "") + " " + cards.map(c => c.description || "").join(" ");
  const readTime = calculateReadTime(fullContent);

  const blog = new Blog({
    title: req.body.title,
    introText: req.body.introText,
    cards,
    meta: { readTime, views: 0 },
  });

  await blog.save();
  res.status(201).json(new ApiResponse(201, blog, "Blog created"));
});

//  Get all blogs
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().populate("commentsCount");
  res.status(200).json(new ApiResponse(200, blogs));
});

//  Get single blog , increment views
export const getSingleBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("commentsCount");
  if (!blog) throw new ApiError(404, "Blog not found");

  blog.meta.views += 1;
  await blog.save();

  res.status(200).json(new ApiResponse(200, blog));
});

//  Update blog
export const updateBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  let cards = [];
  if (req.body.cards) {
    try {
      cards = JSON.parse(req.body.cards);
    } catch (err) {
      throw new ApiError(400, "Invalid cards JSON");
    }
  }

  if (req.files && req.files.length > 0) {
    req.files.forEach((file, index) => {
      if (cards[index]) cards[index].image = file.path;
    });
  }

  const fullContent = (req.body.introText || "") + " " + cards.map(c => c.description || "").join(" ");
  const readTime = calculateReadTime(fullContent);

  blog.title = req.body.title || blog.title;
  blog.introText = req.body.introText || blog.introText;
  blog.cards = cards.length > 0 ? cards : blog.cards;
  blog.meta.readTime = readTime;

  await blog.save();
  res.status(200).json(new ApiResponse(200, blog, "Blog updated"));
});

//  Delete blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");

  res.status(200).json(new ApiResponse(200, blog, "Blog deleted successfully"));
});
