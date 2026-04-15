import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.number(),
  hotelId: z.number(),
  bookingAmount: z.number().positive(),
  totalGuests: z.number().int().positive()
});

export const confirmBookingParamsSchema = z.object({
  idempotencyKey: z.string().uuid()
});

export const cancelBookingParamsSchema = z.object({
  id: z.coerce.number().int().positive()
});