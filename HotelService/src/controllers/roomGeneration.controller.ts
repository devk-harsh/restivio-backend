import {
  Request,
  Response,
} from "express";

import { StatusCodes } from "http-status-codes";

import {
  generateRoomInventoryService,
} from "../services/roomGeneration.service";

export async function generateRoomInventoryHandler(
  req: Request,
  res: Response
) {
  const hotelId =
    Number(req.params.hotelId);

  const roomCategoryId =
    Number(
      req.params.roomCategoryId
    );

  const result =
    await generateRoomInventoryService(
      hotelId,
      roomCategoryId,
      req.body
    );

  res
    .status(StatusCodes.CREATED)
    .json({
      message:
        "Room inventory generated successfully",

      success: true,

      data: result,
    });
}