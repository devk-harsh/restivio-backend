import express from 'express';
import { createBookingHandler,
         confirmBookingHandler,
         getBookingByIdHandler,
 } from '../../controllers/booking.controller';
import {validateRequestBody, validateRequestParams} from '../../validators';
import {createBookingSchema} from '../../validators/booking.validator';
import { confirmBookingParamsSchema } from '../../validators/booking.validator';

const bookingRouter = express.Router();

bookingRouter.post("/", validateRequestBody(createBookingSchema), createBookingHandler);
bookingRouter.post("/confirm/:idempotencyKey", validateRequestParams(confirmBookingParamsSchema), confirmBookingHandler);

bookingRouter.get("/:id", getBookingByIdHandler);

export default bookingRouter;

