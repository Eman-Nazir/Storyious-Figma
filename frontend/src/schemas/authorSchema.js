import { z } from "zod";

export const createAuthorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortBio: z.string().min(1, "Short bio is required"),
  fullBio: z.string().min(1, "Full bio is required"),
  isVerified: z.boolean(),
  image: z.any().optional(), 
  socials: z.array(
    z.object({
      platform: z.string(),
    })
  ),
});
