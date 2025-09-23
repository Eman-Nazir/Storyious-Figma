import mongoose from "mongoose";
import Author from "./author.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { generateSlug } from "../../utils/slugify.js";

// Get all authors
export const getAllAuthors = asyncHandler(async (req, res) => {
  const { verified } = req.query;
  const filter = {};
  
  if (verified === 'true') {
    filter.isVerified = true;
  } else if (verified === 'false') {
    filter.isVerified = false;
  }
  
  const authors = await Author.find(filter).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, authors));
});

// Get author by ID
export const getAuthorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid author ID");

  const author = await Author.findById(id);
  if (!author) throw new ApiError(404, "Author not found");

  res.status(200).json(new ApiResponse(200, author));
});

// Add author
export const addAuthor = asyncHandler(async (req, res) => {
  const { name, shortBio, fullBio, socials, isVerified } = req.body;

  if (!name) throw new ApiError(400, "Author name is required");

  let socialsArray = [];
  if (socials) {
    try {
      socialsArray = typeof socials === "string" ? JSON.parse(socials) : socials;
    } catch {
      socialsArray = [];
    }
  }

  const image = req.file?.path;
  const slug = generateSlug(name);

  const newAuthor = await Author.create({
    name,
    shortBio,
    fullBio,
    isVerified: isVerified === "true" || isVerified === true,
    image,
    slug,
    socials: socialsArray,
  });

  res.status(201).json(new ApiResponse(201, newAuthor, "Author created successfully"));
});

// Get author by slug
export const getAuthorBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const author = await Author.findOne({ slug });
  if (!author) throw new ApiError(404, "Author not found");

  res.status(200).json(new ApiResponse(200, author));
});

// Update author
export const updateAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, shortBio, fullBio, socials, isVerified } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid author ID");

  let socialsArray = [];
  if (socials) {
    try {
      socialsArray = typeof socials === "string" ? JSON.parse(socials) : socials;
    } catch {
      socialsArray = [];
    }
  }

  const image = req.file?.path;

  const updatedAuthor = await Author.findByIdAndUpdate(
    id,
    {
      name,
      shortBio,
      fullBio,
      isVerified: isVerified === "true" || isVerified === true,
      socials: socialsArray,
      ...(image && { image }),
    },
    { new: true }
  );

  if (!updatedAuthor) throw new ApiError(404, "Author not found");

  res.status(200).json(new ApiResponse(200, updatedAuthor, "Author updated successfully"));
});

// Delete author
export const deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) throw new ApiError(400, "Invalid author ID");

  const author = await Author.findByIdAndDelete(id);

  if (!author) throw new ApiError(404, "Author not found");

  res.status(200).json(new ApiResponse(200, null, "Author deleted successfully"));
});