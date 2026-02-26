import logger from "../config/logger.config";
import Hotel from "../db/models/hotel";
import { createHotelDTO, updateHotelDTO } from "../dtos/hotel.dto";
import { NotFoundError } from "../utils/errors/app.error";

export async function createHotel(hotelData: createHotelDTO ){
    const hotel = await Hotel.create(hotelData);
    logger.info(`Hotel created with ID: ${hotel.id}`);
    return hotel;
}

export async function getHotelById(hotelId: number){
    const hotel = await Hotel.findByPk(hotelId);
    if(!hotel){
        logger.error(`Hotel not found with ID: ${hotelId}`);
        throw new NotFoundError("Hotel not found");
    }
    logger.info(`Hotel retrieved with ID: ${hotelId}`);
    return hotel;
}


export async function getAllHotels(){
    const hotels = await Hotel.findAll({
        where: { 
            deletedAt: null }
    });
    
    //Hotel.findAll() NEVER returns null or undefined. 
    //It returns an empty array if no records are found.

    // if(!hotels){
    //     logger.error(`No hotels found`);
    //     throw new NotFoundError("No hotels found");
    // }

    logger.info(`Retrieved all hotels, count: ${hotels.length}`);
    return hotels;
}

export async function softDeleteHotel(hotelId: number){
    const hotel = await Hotel.findByPk(hotelId);
    if(!hotel){
        logger.error(`Hotel not found with ID: ${hotelId}`);
        throw new NotFoundError("Hotel not found");
    }
    hotel.deletedAt = new Date();
    await hotel.save();
    logger.info(`Hotel soft-deleted with ID: ${hotelId}`);
    return true;//Let's not return hotel instance after deletion
}

export async function updateHotel(hotelId: number, hotelData: updateHotelDTO){
    const hotel = await Hotel.findByPk(hotelId);
    if(!hotel){
        logger.error(`Hotel not found with ID: ${hotelId}`);
        throw new NotFoundError("Hotel not found");
    }
    await hotel.update(hotelData);
    logger.info(`Hotel updated with ID: ${hotelId}`);
    return hotel;
}

