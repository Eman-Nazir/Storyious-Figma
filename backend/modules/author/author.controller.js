import mongoose from "mongoose";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Author from "./author.model.js";
import { generateSlug } from "../../utils/slugify.js";

// GET all authors
export const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, authors));
});

// GET author by ID
export const getAuthorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid author ID");

  const author = await Author.findById(id);
  if (!author) throw new ApiError(404, "Author not found");

  res.status(200).json(new ApiResponse(200, author));
});

// POST create a new author
export const addAuthor = asyncHandler(async (req, res) => {
  const { name, shortBio, fullBio } = req.body;
  const image = req.files?.["image"] ? req.files["image"][0].filename : "";

  // Generate slug using reusable utility
  const slug = generateSlug(name);

  const newAuthor = await Author.create({ name, shortBio, fullBio, image, slug });
  res.status(201).json(new ApiResponse(201, newAuthor, "Author created successfully"));
});
