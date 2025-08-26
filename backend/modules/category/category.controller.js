import Category from "./category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// CREATE a new category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  const category = new Category({
    name,
    description,
  });

  const savedCategory = await category.save();

  res
    .status(201)
    .json(new ApiResponse(201, savedCategory, "Category created successfully"));
});

// GET all categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res
    .status(200)
    .json(
      new ApiResponse(200, categories, "Categories retrieved successfully")
    );
});
