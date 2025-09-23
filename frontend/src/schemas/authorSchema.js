
import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1, "Author name is required"),
  shortBio: z.string().optional(),
  fullBio: z.string().optional(),
  isVerified: z.union([z.boolean(), z.string()]).optional().default(false),
  image: z.any().optional(),
  socials: z.array(z.object({
    platform: z.string(),
    url: z.string().url().optional().or(z.literal(''))
  })).optional().default([])
});