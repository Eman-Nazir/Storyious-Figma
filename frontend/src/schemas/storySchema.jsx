import { z } from "zod";

export const storySchema = z.object({
  title: z.string().min(1, "Title is required"),
  introText: z.string().min(1, "Intro Text is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.string().min(1, "Author is required"),
  categoryId: z.string().min(1, "Category is required"),
  featuredImage: z
    .any()
    .refine(
      (file) => file instanceof File || (Array.isArray(file) && file.length > 0),
      "Featured Image is required"
    ),
});

export const updateStorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  introText: z.string().min(1, "Intro Text is required"),
  content: z.string().min(1, "Content is required"),
  authorId: z.string().min(1, "Author is required"),
  categoryId: z.string().min(1, "Category is required"),
  featuredImage: z.any().optional(),
});
