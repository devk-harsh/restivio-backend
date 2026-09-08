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

  async findByIdAndHotelId(
    roomCategoryId: number,
    hotelId: number
    ): Promise<RoomCategory | null> {
    const roomCategory = await this.model.findOne({
        where: {
        id: roomCategoryId,
        hotelId,
        deletedAt: null,
        },
    });

    return roomCategory;
  }

  async updateByIdAndHotelId(
    roomCategoryId: number,
    hotelId: number,
    data: {
        price?: number;
        roomCount?: number;
    }
    ): Promise<RoomCategory | null> {
    const roomCategory =
        await this.findByIdAndHotelId(
        roomCategoryId,
        hotelId
        );

    if (!roomCategory) {
        return null;
    }

    await roomCategory.update(data);

    return roomCategory;
  }
  
  async deleteByIdAndHotelId(
    roomCategoryId: number,
    hotelId: number
    ): Promise<boolean> {
    const deletedCount = await this.model.destroy({
        where: {
        id: roomCategoryId,
        hotelId,
        },
    });

    return deletedCount > 0;
  }
}
