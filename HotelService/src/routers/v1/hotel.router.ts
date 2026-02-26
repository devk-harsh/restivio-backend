import express from 'express';
import { createHotelHandler, getHotelByIdHandler, getAllHotelsHandler, deleteHotelHandler, updateHotelHandler} from '../../controllers/hotel.controller';
import {  validateRequestBody } from '../../validators';
import { hotelSchema, updateHotelSchema } from '../../validators/hotel.validator';
const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema), createHotelHandler);

hotelRouter.get('/:id', getHotelByIdHandler);

hotelRouter.get('/', getAllHotelsHandler);

hotelRouter.put('/:id', validateRequestBody(updateHotelSchema), updateHotelHandler);

hotelRouter.delete('/:id', deleteHotelHandler);
export default hotelRouter;