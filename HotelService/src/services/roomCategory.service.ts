import { UniqueConstraintError } from "sequelize";
import { CreateRoomCategoryDTO, UpdateRoomCategoryDTO } from "../dtos/roomCategory.dto";
import { HotelRepository } from "../repositories/hotel.repository";
import { RoomCategoryRepository } from "../repositories/roomCategory.repository";
import { ConflictError, NotFoundError, } from "../utils/errors/app.error";
import { RoomRepository } from "../repositories/room.repository";

const hotelRepository = new HotelRepository();
const roomCategoryRepository = new RoomCategoryRepository();
const roomRepository = new RoomRepository();

export async function createRoomCategoryService(
  hotelId: number,
  roomCategoryData: CreateRoomCategoryDTO
) {
  // 1. Make sure parent hotel exists
  await hotelRepository.findById(hotelId);

  // 2. Prevent duplicate room type for same hotel
  const existingRoomCategory =
    await roomCategoryRepository.findByHotelAndType(
      hotelId,
      roomCategoryData.roomType
    );

  if (existingRoomCategory) {
    throw new ConflictError(
      `${roomCategoryData.roomType} room category already exists for this hotel`
    );
  }

  // 3. Create room category
  try {
    const roomCategory =
      await roomCategoryRepository.create({
        hotelId,
        roomType: roomCategoryData.roomType,
        price: roomCategoryData.price,
        roomCount: roomCategoryData.roomCount,
      });

    return roomCategory;
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      throw new ConflictError(
        `${roomCategoryData.roomType} room category already exists for this hotel`
      );
    }

    throw error;
  }
}

export async function getRoomCategoriesByHotelService(
  hotelId: number
) {
  // Make sure hotel exists first
  await hotelRepository.findById(hotelId);

  const roomCategories =
    await roomCategoryRepository.findByHotelId(hotelId);

  return roomCategories;
}

async function getRoomCategoryForHotel(
  hotelId: number,
  roomCategoryId: number
) {
  // Make sure the parent hotel exists.
  await hotelRepository.findById(hotelId);

  const roomCategory =
    await roomCategoryRepository.findByIdAndHotelId(
      roomCategoryId,
      hotelId
    );

  if (!roomCategory) {
    throw new NotFoundError(
      "Room category not found for this hotel"
    );
  }

  return roomCategory;
}

export async function updateRoomCategoryService(
  hotelId: number,
  roomCategoryId: number,
  roomCategoryData: UpdateRoomCategoryDTO
) {
  const existingRoomCategory =
    await getRoomCategoryForHotel(
      hotelId,
      roomCategoryId
    );

  const roomCountChanged =
    roomCategoryData.roomCount !== undefined &&
    roomCategoryData.roomCount !==
      existingRoomCategory.roomCount;

  if (roomCountChanged) {
    const generatedRoomCount =
      await roomRepository.countByRoomCategoryId(
        roomCategoryId
      );

    if (generatedRoomCount > 0) {
      throw new ConflictError(
        "Room count cannot be changed after room inventory has been generated"
      );
    }
  }

  const updatedRoomCategory =
    await roomCategoryRepository.updateByIdAndHotelId(
      roomCategoryId,
      hotelId,
      roomCategoryData
    );

  if (!updatedRoomCategory) {
    throw new NotFoundError(
      "Room category not found"
    );
  }

  return updatedRoomCategory;
}

export async function deleteRoomCategoryService(
  hotelId: number,
  roomCategoryId: number
) {
  await getRoomCategoryForHotel(
    hotelId,
    roomCategoryId
  );

  const generatedRoomCount =
    await roomRepository.countByRoomCategoryId(
      roomCategoryId
    );

  if (generatedRoomCount > 0) {
    throw new ConflictError(
      "Room category cannot be deleted because room inventory already exists"
    );
  }

  const deleted =
    await roomCategoryRepository.deleteByIdAndHotelId(
      roomCategoryId,
      hotelId
    );

  if (!deleted) {
    throw new NotFoundError(
      "Room category not found"
    );
  }

  return true;
}