import {Request,Response,} from "express";
import { StatusCodes } from "http-status-codes";
import { createRoomCategoryService,getRoomCategoriesByHotelService,} 
from "../services/roomCategory.service";

export async function createRoomCategoryHandler(
  req: Request,
  res: Response
) {
  const hotelId = Number(req.params.hotelId);

  const roomCategory =
    await createRoomCategoryService(
      hotelId,
      req.body
    );

  res.status(StatusCodes.CREATED).json({
    message: "Room category created successfully",
    data: roomCategory,
    success: true,
  });
}

export async function getRoomCategoriesByHotelHandler(
  req: Request,
  res: Response
) {
  const hotelId = Number(req.params.hotelId);

  const roomCategories =
    await getRoomCategoriesByHotelService(
      hotelId
    );

  res.status(StatusCodes.OK).json({
    message: "Room categories retrieved successfully",
    data: roomCategories,
    success: true,
  });
}