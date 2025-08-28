
import mongoose from 'mongoose';

import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import Author from "./author.model.js";
import { generateSlug } from "../../utils/slugify.js";

export const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await Author.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, authors));
});

export const getAuthorById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid author ID");

  const author = await Author.findById(id);
  if (!author) throw new ApiError(404, "Author not found");

  res.status(200).json(new ApiResponse(200, author));
});

export const addAuthor = asyncHandler(async (req, res) => {
  const { name, shortBio, fullBio, socials } = req.body;

  let socialsArray = [];
  if (socials) {
    try {
      socialsArray = typeof socials === "string" ? JSON.parse(socials) : socials;
    } catch (err) {
      socialsArray = [];
    }
  }

  const image = req.files?.["image"] ? req.files["image"][0].filename : "";

  const slug = generateSlug(name);

  const newAuthor = await Author.create({
    name,
    shortBio,
    fullBio,
    image,
    slug,
    socials: socialsArray,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newAuthor, "Author created successfully"));
});


export const deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid author ID");

  const author = await Author.findByIdAndDelete(id);

  if (!author) throw new ApiError(404, "Author not found");

  res.status(200).json(new ApiResponse(200, null, "Author deleted successfully"));
});



export const updateAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, shortBio, fullBio, socials } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid author ID");

  let socialsArray = [];
  if (socials) {
    try {
      socialsArray = typeof socials === "string" ? JSON.parse(socials) : socials;
    } catch (err) {
      socialsArray = [];
    }
  }

  const image = req.files?.["image"] ? req.files["image"][0].filename : undefined;

  const updatedAuthor = await Author.findByIdAndUpdate(
    id,
    {
      name,
      shortBio,
      fullBio,
      socials: socialsArray,
      ...(image && { image }), 
    },
    { new: true }
  );

  if (!updatedAuthor) throw new ApiError(404, "Author not found");

  res
    .status(200)
    .json(new ApiResponse(200, updatedAuthor, "Author updated successfully"));
});
