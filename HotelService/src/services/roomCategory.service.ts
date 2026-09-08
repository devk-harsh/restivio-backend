import { UniqueConstraintError } from "sequelize";
import { CreateRoomCategoryDTO } from "../dtos/roomCategory.dto";
import { HotelRepository } from "../repositories/hotel.repository";
import { RoomCategoryRepository } from "../repositories/roomCategory.repository";
import { ConflictError } from "../utils/errors/app.error";

const hotelRepository = new HotelRepository();
const roomCategoryRepository = new RoomCategoryRepository();

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