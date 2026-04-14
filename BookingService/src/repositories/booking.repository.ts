import logger from "../config/logger.config";
import Booking from "../db/models/booking";
import { Transaction } from "sequelize";

interface CreateBookingRepositoryDTO {
  userId: number;
  hotelId: number;
  bookingAmount: number;
  totalGuests: number;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}
//Here we used separate DTO for repository because we want to set the status as "PENDING" by default when creating a booking.
//This way, the service layer can call the repository with the necessary data without worrying about setting the status.    


export async function createBooking(
  bookingData: CreateBookingRepositoryDTO,
  transaction: Transaction
) {
  const booking = await Booking.create(bookingData, { transaction });
  logger.info(`Booking created with ID: ${booking.id}`);
  return booking;
}

export async function confirmBooking(
  bookingId: number,
  transaction: Transaction
) {
  const [updatedRowsCount] = await Booking.update(
    { status: "CONFIRMED" },
    {
      where: { id: bookingId },
      transaction
    }
  );

  if (updatedRowsCount === 0) {
    return null;
  }

  const booking = await Booking.findByPk(bookingId, { transaction });
  logger.info(`Booking confirmed with ID: ${bookingId}`);
  return booking;
}