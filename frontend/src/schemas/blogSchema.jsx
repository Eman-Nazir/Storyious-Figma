import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(1, "Main title is required"),
  introText: z.string().optional(),
  cards: z
    .array(
      z.object({
        title: z.string().min(1, "Card title is required"),
        subtitle: z.string().optional(),
        description: z.string().optional(),
        button_text: z.string().optional(),
        button_link: z.string().optional(),
        image: z.any().optional(), 
        oldImage: z.string().optional(), 
        fileName: z.string().optional(), 
      })
    )
    .min(1, "At least one card is required"),
});