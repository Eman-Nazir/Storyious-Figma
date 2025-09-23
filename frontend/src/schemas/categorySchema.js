
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  image: z.any().optional(),
  status: z.enum(['active', 'inactive']).default('active')
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
  image: z.any().optional(),
  status: z.enum(['active', 'inactive'])
});