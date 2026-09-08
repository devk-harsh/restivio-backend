import Room from "../db/models/room";
import BaseRepository from "./base.repository";

export class RoomRepository extends BaseRepository<Room> {
  constructor() {
    super(Room);
  }

  async countByRoomCategoryId(
    roomCategoryId: number
  ): Promise<number> {
    const count = await this.model.count({
      where: {
        roomCategoryId,
      },
    });

    return count;
  }
}