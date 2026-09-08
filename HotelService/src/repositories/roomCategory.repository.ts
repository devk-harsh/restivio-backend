import RoomCategory, {RoomType,} from "../db/models/roomCategory";

import BaseRepository from "./base.repository";

export class RoomCategoryRepository extends BaseRepository<RoomCategory> {
  constructor() {
    super(RoomCategory);
  }

  async findByHotelId(
    hotelId: number
  ): Promise<RoomCategory[]> {
    const roomCategories = await this.model.findAll({
      where: {
        hotelId,
        deletedAt: null,
      },
      order: [["price", "ASC"]],
    });

    return roomCategories;
  }

  async findByHotelAndType(
    hotelId: number,
    roomType: RoomType
  ): Promise<RoomCategory | null> {
    const roomCategory = await this.model.findOne({
      where: {
        hotelId,
        roomType,
        deletedAt: null,
      },
    });

    return roomCategory;
  }
}