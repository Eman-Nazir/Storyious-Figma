import Category from "./category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getAdminStatusFilter = (status) => {
  if (!status || status === "all") return {};

  if (status !== "active" && status !== "inactive") {
    throw new ApiError(400, "Status must be active, inactive, or all");
  }

  return { status };
};

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  const image = req.file?.path || null;

  const category = new Category({
    name,
    description,
    image,
    status,
  });

  const savedCategory = await category.save();

  res.status(201).json(
    new ApiResponse(
      201,
      savedCategory,
      "Category created successfully"
    )
  );
});

// Public: active categories only.
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ status: "active" });

  res.status(200).json(
    new ApiResponse(
      200,
      categories,
      "Categories retrieved successfully"
    )
  );
});

// Admin: all statuses or an explicit status filter.
export const getAdminCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find(
    getAdminStatusFilter(req.query.status)
  );

  res.status(200).json(
    new ApiResponse(
      200,
      categories,
      "Categories retrieved successfully"
    )
  );
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Category deleted successfully"
    )
  );
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name, description, status } = req.body;

  if (!name) {
    throw new ApiError(400, "Category name is required");
  }

  const updatedData = { name, description, status };

  if (req.file?.path) {
    updatedData.image = req.file.path;
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  if (!updatedCategory) {
    throw new ApiError(404, "Category not found");
  }

  res.status(200).json(
    new ApiResponse(
      200,
      updatedCategory,
      "Category updated successfully"
    )
  );
});

export default Category;