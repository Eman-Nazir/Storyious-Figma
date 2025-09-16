import FAQ from "./faq.model.js";
import { generateSlug } from "../../utils/slugify.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const getAllFAQs = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  let filter = {};
  if (category && category !== 'all') {
    filter = { category };
  }
  
  const faqs = await FAQ.find(filter).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, faqs, "FAQs retrieved successfully"));
});

export const getFAQsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  
  const faqs = await FAQ.find({ category }).sort({ createdAt: -1 });
  
  if (!faqs || faqs.length === 0) {
    throw new ApiError(404, `No FAQs found for category: ${category}`);
  }

  res.status(200).json(new ApiResponse(200, faqs, "FAQs retrieved successfully"));
});

export const getFAQBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const faq = await FAQ.findOne({ slug });

  if (!faq) throw new ApiError(404, "FAQ not found");

  res.status(200).json(new ApiResponse(200, faq, "FAQ retrieved successfully"));
});

export const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer, category } = req.body;

  if (!question || !answer) {
    throw new ApiError(400, "Question and answer are required");
  }

  const slug = generateSlug(question);

  const faq = await FAQ.create({ question, answer, category, slug });
  res.status(201).json(new ApiResponse(201, faq, "FAQ created successfully"));
});

export const deleteFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const faq = await FAQ.findByIdAndDelete(id);

  if (!faq) throw new ApiError(404, "FAQ not found");

  res.status(200).json(new ApiResponse(200, null, "FAQ deleted successfully"));
});

export const updateFAQ = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question, answer, category } = req.body;

  if (!question || !answer) throw new ApiError(400, "Question and answer are required");

  const slug = generateSlug(question);

  const faq = await FAQ.findByIdAndUpdate(
    id,
    { question, answer, category, slug },
    { new: true }
  );

  if (!faq) throw new ApiError(404, "FAQ not found");

  res.status(200).json(new ApiResponse(200, faq, "FAQ updated successfully"));
});