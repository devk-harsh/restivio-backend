import {z} from "zod";

export const pingBodySchema = z.object({
  message: z.string().min(2).optional(),
});

export const pingQuerySchema = z.object({
  search: z.string().min(5).optional(), // Optional search keyword
});