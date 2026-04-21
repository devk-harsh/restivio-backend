import axios from "axios";
import logger from "../config/logger.config";
import { serverConfig } from "../config";

interface SendBookingConfirmedNotificationArgs {
  to: string;
  bookingId: number;
  hotelId: number;
  totalGuests: number;
  bookingAmount: string | number;
}

interface SendBookingCancelledNotificationArgs {
  to: string;
  bookingId: number;
  hotelId: number;
  totalGuests: number;
  bookingAmount: string | number;
}


export async function sendBookingConfirmedNotification(
  args: SendBookingConfirmedNotificationArgs
) {
  try {
    await axios.post(
      `${serverConfig.NOTIFICATION_SERVICE_URL}/api/v1/notification/email`,
      {
        to: args.to,
        subject: "Booking Confirmed",
        templateId: "booking-confirmed",
        params: {
          bookingId: args.bookingId,
          hotelId: args.hotelId,
          totalGuests: args.totalGuests,
          bookingAmount: String(args.bookingAmount),
        },
      }
    );

    logger.info("Booking confirmation notification queued successfully", {
      to: args.to,
      bookingId: args.bookingId,
    });
  } catch (error) {
    logger.error("Failed to queue booking confirmation notification", {
      to: args.to,
      bookingId: args.bookingId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

export async function sendBookingCancelledNotification(
  args: SendBookingCancelledNotificationArgs
) {
  try {
    await axios.post(
      `${serverConfig.NOTIFICATION_SERVICE_URL}/api/v1/notification/email`,
      {
        to: args.to,
        subject: "Booking Cancelled",
        templateId: "booking-cancelled",
        params: {
          bookingId: args.bookingId,
          hotelId: args.hotelId,
          totalGuests: args.totalGuests,
          bookingAmount: String(args.bookingAmount),
        },
      }
    );

    logger.info("Booking cancellation notification queued successfully", {
      to: args.to,
      bookingId: args.bookingId,
    });
  } catch (error) {
    logger.error("Failed to queue booking cancellation notification", {
      to: args.to,
      bookingId: args.bookingId,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}