import Category from "./category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// CREATE a new category
export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(400, "Category name is required");

  const image = req.files?.image?.[0]?.filename || null;

  const category = new Category({ name, description, image });
  const savedCategory = await category.save();

  res.status(201).json(
    new ApiResponse(201, savedCategory, "Category created successfully")
  );
});

// GET all categories
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json(
    new ApiResponse(200, categories, "Categories retrieved successfully")
  );
});

// DELETE category by ID
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, "Category not found");

  res.status(200).json(
    new ApiResponse(200, null, "Category deleted successfully")
  );
});

// UPDATE category by ID
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name) throw new ApiError(400, "Category name is required");

  const updatedData = { name, description };
  if (req.files?.image?.[0]?.filename) {
    updatedData.image = req.files.image[0].filename;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    updatedData,
    { new: true }
  );

  if (!updatedCategory) throw new ApiError(404, "Category not found");

  res.status(200).json(
    new ApiResponse(200, updatedCategory, "Category updated successfully")
  );
});

