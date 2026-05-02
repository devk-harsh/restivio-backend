import { createHotelDTO, updateHotelDTO } from "../dtos/hotel.dto";
import { HotelRepository } from "../repositories/hotel.repository";

const hotelRepository = new HotelRepository();

export async function createHotelService(hotelData: createHotelDTO) {
  const hotel = await hotelRepository.createHotel(hotelData);
  return hotel;
}

export async function getHotelByIdService(hotelId: number) {
  const hotel = await hotelRepository.findById(hotelId);
  return hotel;
}

export async function getAllHotelsService() {
  const hotels = await hotelRepository.findAll();
  return hotels;
}

export async function deleteHotelService(hotelId: number) {
  const response = await hotelRepository.softDelete(hotelId);
  return response;
}

export async function updateHotelService(
  hotelId: number,
  hotelData: updateHotelDTO
) {
  const hotel = await hotelRepository.updateHotel(hotelId, hotelData);
  return hotel;
}