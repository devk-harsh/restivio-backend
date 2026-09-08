import {RoomType} from "../db/models/roomCategory";

export type CreateRoomCategoryDTO = {
    roomType: RoomType;
    price: number;
    roomCount: number;
};