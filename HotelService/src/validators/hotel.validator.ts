import { z } from "zod";
import { positiveIntegerString } from "./common.validator";

export const hotelSchema = z.object({
    name : z.string().min(1),
    address : z.string().min(1),
    location : z.string().min(1),
    rating: z.number().min(0).max(5).optional(),
    ratingCount: z.number().int().nonnegative().optional(),
})
.strict();

export const updateHotelSchema = z.object({
  name: z.string().min(1).optional(),
  address: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  rating: z.number().min(0).max(5).optional(),
  ratingCount: z.number().int().nonnegative().optional(),
})
.strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided for update",
    }
  );

export const hotelIdParamSchema = z.object({
  id: positiveIntegerString,
});