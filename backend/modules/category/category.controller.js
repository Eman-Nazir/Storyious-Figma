
import Category from "./category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  if (!name) throw new ApiError(400, "Category name is required");

  const image = req.file?.path || null;

  const category = new Category({ name, description, image });
  const savedCategory = await category.save();

  res
    .status(201)
    .json(new ApiResponse(201, savedCategory, "Category created successfully"));
});

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res
    .status(200)
    .json(new ApiResponse(200, categories, "Categories retrieved successfully"));
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new ApiError(404, "Category not found");

  res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});

// UPDATE category by ID
export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!name) throw new ApiError(400, "Category name is required");

  const updatedData = { name, description };
  if (req.file?.path) {
    updatedData.image = req.file.path; 
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!updatedCategory) throw new ApiError(404, "Category not found");

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedCategory, "Category updated successfully")
    );
});
