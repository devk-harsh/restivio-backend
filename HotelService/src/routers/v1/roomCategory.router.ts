import express from "express";
import {createRoomCategoryHandler, getRoomCategoriesByHotelHandler,
} from "../../controllers/roomCategory.controller";

import {validatePathParams, validateRequestBody,
} from "../../validators";
import {createRoomCategorySchema, roomCategoryHotelParamsSchema,
} from "../../validators/roomCategory.validator";

const roomCategoryRouter = express.Router({
  mergeParams: true,
});

roomCategoryRouter.post(
  "/",
  validatePathParams(roomCategoryHotelParamsSchema),
  validateRequestBody(createRoomCategorySchema),
  createRoomCategoryHandler
);

roomCategoryRouter.get(
  "/",
  validatePathParams(roomCategoryHotelParamsSchema),
  getRoomCategoriesByHotelHandler
);

export default roomCategoryRouter;