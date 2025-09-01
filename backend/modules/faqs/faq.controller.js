import FAQ from "./faq.model.js";
import { generateSlug } from "../../utils/slugify.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

// GET all FAQs
export const getAllFAQs = asyncHandler(async (req, res) => {
  const faqs = await FAQ.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, faqs, "FAQs retrieved successfully"));
});

// GET single FAQ by slug
export const getFAQBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const faq = await FAQ.findOne({ slug });
  if (!faq) throw new ApiError(404, "FAQ not found");

  res.status(200).json(new ApiResponse(200, faq, "FAQ retrieved successfully"));
});

// ADD a new FAQ
export const createFAQ = asyncHandler(async (req, res) => {
  const { question, answer } = req.body;

  if (!question || !answer) {
    throw new ApiError(400, "Question and answer are required");
  }

  // Generate slug using slugify 
  const slug = generateSlug(question);

  const faq = await FAQ.create({ question, answer, slug });
  res.status(201).json(new ApiResponse(201, faq, "FAQ created successfully"));
});
