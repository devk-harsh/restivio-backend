import express from 'express';
import { createBookingHandler,
         confirmBookingHandler,
         getBookingByIdHandler,
         cancelBookingHandler,
 } from '../../controllers/booking.controller';
import {validateRequestBody, validateRequestParams} from '../../validators';
import {cancelBookingParamsSchema, createBookingSchema, confirmBookingParamsSchema} from '../../validators/booking.validator';

const bookingRouter = express.Router();

bookingRouter.post("/", validateRequestBody(createBookingSchema), createBookingHandler);

bookingRouter.post("/confirm/:idempotencyKey", validateRequestParams(confirmBookingParamsSchema), confirmBookingHandler);

bookingRouter.get("/:id", getBookingByIdHandler);

bookingRouter.post("/cancel/:id", validateRequestParams(cancelBookingParamsSchema), cancelBookingHandler);

export default bookingRouter;

