import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import logger from "../config/logger.config";
import { CreateBookingDTO } from "../dtos/booking.dto";
import { 
  createBookingService,
  confirmBookingService,
  getBookingByIdService
 } from "../services/booking.service";
import { BadRequestError } from "../utils/errors/app.error";

export async function createBookingHandler(req: Request, res: Response) {
  const bookingData: CreateBookingDTO = {
    userId: req.body.userId,
    hotelId: req.body.hotelId,
    bookingAmount: req.body.bookingAmount,
    totalGuests: req.body.totalGuests
  };

  const result = await createBookingService(bookingData);

  logger.info(`Booking controller returned booking with ID: ${result.booking.id}`);

  return res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Booking created successfully",
    data: result
  });
}


export async function confirmBookingHandler(req: Request, res: Response) {
  const { idempotencyKey } = req.params;
  
  if (!idempotencyKey) {
  throw new BadRequestError("Idempotency key is required");
}

  const booking = await confirmBookingService(idempotencyKey);

  logger.info(`Booking controller confirmed booking with ID: ${booking.id}`);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Booking confirmed successfully",
    data: booking
  });
}

export async function getBookingByIdHandler(req: Request, res: Response) {
  const bookingId = Number(req.params.id);

  const booking = await getBookingByIdService(bookingId);

  logger.info(`Booking controller fetched booking with ID: ${booking.id}`);

  return res.status(StatusCodes.OK).json({
    success: true,
    message: "Booking fetched successfully",
    data: booking
  });
}