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

export const roomCategoryHotelParamsSchema = z.object({
  hotelId: positiveIntegerString,
});