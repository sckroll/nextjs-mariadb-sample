import { z } from "zod";

export const bookSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(1, "Title is required"),
  author: z.string().optional(),
  publisher: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
  totalPages: z.number().int().min(1, "Total pages must be greater than 0"),
  status: z.enum(["WISH", "READING", "COMPLETED"]).default("WISH"),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  rating: z.number().min(0).max(5).multipleOf(0.5).optional(),
  oneLiner: z.string().optional(),
});