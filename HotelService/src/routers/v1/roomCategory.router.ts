import express from "express";
import {
  createRoomCategoryHandler,
  getRoomCategoriesByHotelHandler,
  updateRoomCategoryHandler,
  deleteRoomCategoryHandler,
} from "../../controllers/roomCategory.controller";

import {validatePathParams, validateRequestBody,
} from "../../validators";
import {
  createRoomCategorySchema,
  updateRoomCategorySchema,
  roomCategoryHotelParamsSchema,
  roomCategoryParamsSchema,
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

roomCategoryRouter.patch(
  "/:roomCategoryId",
  validatePathParams(roomCategoryParamsSchema),
  validateRequestBody(updateRoomCategorySchema),
  updateRoomCategoryHandler
);

roomCategoryRouter.delete(
  "/:roomCategoryId",
  validatePathParams(roomCategoryParamsSchema),
  deleteRoomCategoryHandler
);

export default roomCategoryRouter;