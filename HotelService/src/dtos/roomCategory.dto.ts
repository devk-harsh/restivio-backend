import {RoomType} from "../db/models/roomCategory";

export type CreateRoomCategoryDTO = {
    roomType: RoomType;
    price: number;
    roomCount: number;
};

export type UpdateRoomCategoryDTO = {
    //roomType?: RoomType; roomType is identity-like configuration. Once created, we keep it immutable.
    price?: number;
    roomCount?: number;
};