import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .any()
    .refine((files) => files?.length > 0, "Image is required") 
    .refine(
      (files) => !files || files[0] instanceof File,
      "Invalid file format"
    ),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Description is required"),
  image: z
    .any()
    .optional()
    .refine(
      (files) => !files || files.length === 0 || files[0] instanceof File,
      "Invalid file format"
    ),
});






