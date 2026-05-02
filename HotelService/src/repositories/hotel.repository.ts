import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO, updateHotelDTO } from "../dtos/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

import BaseRepository from "./base.repository";

export class HotelRepository extends BaseRepository<Hotel> {
  constructor() {
    super(Hotel);
    }
    async createHotel(hotelData: createHotelDTO): Promise<Hotel> {
    const hotel = await this.create(hotelData);
    logger.info(`Hotel created with ID: ${hotel.id}`);
    return hotel;
  }

  async findById(hotelId: number): Promise<Hotel> {
    const hotel = await this.model.findByPk(hotelId);
    if (!hotel || hotel.deletedAt) {
      logger.error(`Hotel not found with ID: ${hotelId}`);
      throw new NotFoundError("Hotel not found");
    }
    logger.info(`Hotel retrieved with ID: ${hotelId}`);
    return hotel;
  }

  async findAll(): Promise<Hotel[]> {
    const hotels = await this.model.findAll({
      where: {
        deletedAt: null,
      },
    });
    logger.info(`Retrieved all hotels, count: ${hotels.length}`);
    return hotels;
  }

  async softDelete(hotelId: number): Promise<boolean> {
    const hotel = await this.model.findByPk(hotelId);
    if (!hotel || hotel.deletedAt) {
      logger.error(`Hotel not found with ID: ${hotelId}`);
      throw new NotFoundError("Hotel not found");
    }
    hotel.deletedAt = new Date();
    await hotel.save();
    logger.info(`Hotel soft-deleted with ID: ${hotelId}`);
    return true;
  }

  async updateHotel(
    hotelId: number,
    hotelData: updateHotelDTO
  ): Promise<Hotel> {
    const hotel = await this.findById(hotelId);
    await hotel.update(hotelData);
    logger.info(`Hotel updated with ID: ${hotelId}`);
    return hotel;
    }
}
