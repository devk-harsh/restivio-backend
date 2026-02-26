import {createHotelDTO, updateHotelDTO} from '../dtos/hotel.dto';
import {createHotel, getHotelById, getAllHotels, softDeleteHotel, updateHotel} from '../repositories/hotel.repository';


export async function createHotelService(hotelData: createHotelDTO) {
    const hotel = await createHotel(hotelData);
    return hotel;
}

export async function getHotelByIdService(hotelId: number) {
    const hotel = await getHotelById(hotelId);
    return hotel;
}

export async function getAllHotelsService() {
    const hotels = await getAllHotels();
    return hotels;
}

export async function deleteHotelService(hotelId: number) {
    const hotel = await softDeleteHotel(hotelId);
    return hotel;
}

export async function updateHotelService(hotelId: number, hotelData: updateHotelDTO) {
    const hotel = await updateHotel(hotelId, hotelData);
    return hotel;
}