import { z } from "zod";

import { RoomType } from "../db/models/roomCategory";
import { positiveIntegerString } from "./common.validator";

export const createRoomCategorySchema = z
  .object({
    roomType: z.nativeEnum(RoomType),

    price: z
      .number()
      .int()
      .positive(),

    roomCount: z
      .number()
      .int()
      .positive(),
  })
  .strict();

export const updateRoomCategorySchema = z
  .object({
    price: z
      .number()
      .int()
      .positive()
      .optional(),

    roomCount: z
      .number()
      .int()
      .positive()
      .optional(),
  })
  .strict()
  .refine(
    (data) => Object.keys(data).length > 0,
    {
      message: "At least one field must be provided for update",
    }
  );

export const roomCategoryHotelParamsSchema = z.object({
  hotelId: positiveIntegerString,
});

export const roomCategoryParamsSchema = z.object({
  hotelId: positiveIntegerString,
  roomCategoryId: positiveIntegerString,
});