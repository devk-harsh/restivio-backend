import { CreationAttributes } from "sequelize";

import Room from "../db/models/room";

import { GenerateRoomInventoryDTO } from "../dtos/roomGeneration.dto";

import { HotelRepository } from "../repositories/hotel.repository";
import { RoomCategoryRepository } from "../repositories/roomCategory.repository";
import { RoomRepository } from "../repositories/room.repository";

import {
  BadRequestError,
  NotFoundError,
} from "../utils/errors/app.error";

import { getInclusiveDateRange } from "../utils/date.utils";

const hotelRepository =
  new HotelRepository();

const roomCategoryRepository =
  new RoomCategoryRepository();

const roomRepository =
  new RoomRepository();

const ROOM_NUMBER_BLOCK_SIZE = 100_000;

const INSERT_BATCH_SIZE = 1000;

function generateRoomNo(
  roomCategoryId: number,
  ordinal: number
) {
  const roomNo =
    roomCategoryId *
      ROOM_NUMBER_BLOCK_SIZE +
    ordinal;

  if (
    roomNo >
    2_147_483_647
  ) {
    throw new BadRequestError(
      "Generated room number exceeds database integer limit"
    );
  }

  return roomNo;
}

export async function generateRoomInventoryService(
  hotelId: number,
  roomCategoryId: number,
  generationData: GenerateRoomInventoryDTO
) {
  // 1. Ensure hotel exists
  await hotelRepository.findById(
    hotelId
  );

  // 2. Ensure category belongs to this hotel
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

  if (
    roomCategory.roomCount >=
    ROOM_NUMBER_BLOCK_SIZE
  ) {
    throw new BadRequestError(
      `roomCount must be less than ${ROOM_NUMBER_BLOCK_SIZE}`
    );
  }

  // 3. Generate list of dates
  const dates =
    getInclusiveDateRange(
      generationData.startDate,
      generationData.endDate
    );

  // 4. Read already-generated inventory
  const existingInventory =
    await roomRepository.findInventoryInDateRange(
      roomCategoryId,
      generationData.startDate,
      generationData.endDate
    );

  const existingInventoryKeys =
    new Set(
      existingInventory.map(
        (room) =>
          `${room.roomNo}:${room.dateOfAvailability}`
      )
    );

  // 5. Build only missing rows
  const roomsToCreate:
    CreationAttributes<Room>[] = [];

  for (
    let ordinal = 1;
    ordinal <= roomCategory.roomCount;
    ordinal++
  ) {
    const roomNo =
      generateRoomNo(
        roomCategoryId,
        ordinal
      );

    for (const date of dates) {
      const inventoryKey =
        `${roomNo}:${date}`;

      if (
        existingInventoryKeys.has(
          inventoryKey
        )
      ) {
        continue;
      }

      roomsToCreate.push({
        hotelId,
        roomCategoryId,
        roomNo,
        dateOfAvailability: date,
        bookingId: null,
      });
    }
  }

  // 6. Insert in manageable batches
  for (
    let index = 0;
    index < roomsToCreate.length;
    index += INSERT_BATCH_SIZE
  ) {
    const batch =
      roomsToCreate.slice(
        index,
        index +
          INSERT_BATCH_SIZE
      );

    await roomRepository.bulkCreateInventory(
      batch
    );
  }

  const expectedRows =
    roomCategory.roomCount *
    dates.length;

  return {
    hotelId,
    roomCategoryId,

    startDate:
      generationData.startDate,

    endDate:
      generationData.endDate,

    roomCount:
      roomCategory.roomCount,

    datesProcessed:
      dates.length,

    expectedRows,

    createdRows:
      roomsToCreate.length,

    existingRowsSkipped:
      expectedRows -
      roomsToCreate.length,
  };
}