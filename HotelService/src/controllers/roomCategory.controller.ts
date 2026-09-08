import {Request,Response,} from "express";
import { StatusCodes } from "http-status-codes";
import {
  createRoomCategoryService,
  getRoomCategoriesByHotelService,
  updateRoomCategoryService,
  deleteRoomCategoryService,
} from "../services/roomCategory.service";

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

export async function updateRoomCategoryHandler(
  req: Request,
  res: Response
) {
  const hotelId = Number(req.params.hotelId);
  const roomCategoryId =
    Number(req.params.roomCategoryId);

  const roomCategory =
    await updateRoomCategoryService(
      hotelId,
      roomCategoryId,
      req.body
    );

  res.status(StatusCodes.OK).json({
    message: "Room category updated successfully",
    data: roomCategory,
    success: true,
  });
}

export async function deleteRoomCategoryHandler(
  req: Request,
  res: Response
) {
  const hotelId = Number(req.params.hotelId);
  const roomCategoryId =
    Number(req.params.roomCategoryId);

  const deleted =
    await deleteRoomCategoryService(
      hotelId,
      roomCategoryId
    );

  res.status(StatusCodes.OK).json({
    message: "Room category deleted successfully",
    data: deleted,
    success: true,
  });
}