import logger from "../config/logger.config";
import { CreateBookingDTO } from "../dtos/booking.dto";
import sequelize from "../db/models/sequelize";
import { createBooking, confirmBooking, getBookingById} from "../repositories/booking.repository";
import { 
    createIdempotencyKey,
    getIdempotencyKeyWithLock,
    finalizeIdempotencyKey
 } from "../repositories/idempotency.repository";
import { generateIdempotencyKey } from "../utils/helpers/idempotency.helper";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";


export async function createBookingService(bookingData: CreateBookingDTO) {
  const transaction = await sequelize.transaction();
  try {
    const booking = await createBooking(
      {
        ...bookingData,
        status: "PENDING" as const
      },
      transaction
    );

    //throw new Error("Forcing rollback after booking creation"); (to test transaction rollback)
    const idemKey = generateIdempotencyKey();
    await createIdempotencyKey(
      {
        idemKey,
        bookingId: booking.id,
        finalized: false
      },
      transaction
    );
    await transaction.commit();

    logger.info(
      `Booking service created booking ${booking.id} with idempotency key ${idemKey}`
    );
    return {
      booking,
      idemKey
    };

  } catch (error) {
    await transaction.rollback();
    logger.error("Transaction rolled back while creating booking");
    throw error;
  }
}

export async function confirmBookingService(idemKey: string) {
  const transaction = await sequelize.transaction();

  try {
    const idempotencyKey = await getIdempotencyKeyWithLock(idemKey, transaction);

    if (!idempotencyKey) {
      throw new NotFoundError("Idempotency key not found");
    }

    if (idempotencyKey.finalized) {
      throw new BadRequestError("Idempotency key already finalized");
    }

    const booking = await confirmBooking(idempotencyKey.bookingId, transaction);

    if (!booking) {
      throw new NotFoundError("Booking not found");
    }

    await finalizeIdempotencyKey(idemKey, transaction);

    await transaction.commit();

    logger.info(`Booking confirmed successfully for key ${idemKey}`);

    return booking;
  } catch (error) {
    await transaction.rollback();
    logger.error("Transaction rolled back while confirming booking");
    throw error;
  }
}

export async function getBookingByIdService(bookingId: number) {
  const booking = await getBookingById(bookingId);

  if (!booking) {
    throw new NotFoundError("Booking not found");
  }

  return booking;
}