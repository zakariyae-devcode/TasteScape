import { z } from "zod";

export const reviewValidation = z.object({
  rating: z
    .number({
      required_error: "Rating is required.",
      invalid_type_error: "Rating must be a number.",
    })
    .int("Rating must be an integer.")
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5."),
    
  comment: z
    .string({
      required_error: "Comment is required.",
    })
    .trim()
    .min(3, "Comment must be at least 3 characters long.")
    .max(500, "Comment cannot exceed 500 characters."),
});