import express from 'express';
import { createHotelHandler, getHotelByIdHandler, getAllHotelsHandler, deleteHotelHandler, updateHotelHandler} from '../../controllers/hotel.controller';
import {  validateRequestBody, validatePathParams } from '../../validators';
import { hotelSchema, updateHotelSchema, hotelIdParamSchema } from '../../validators/hotel.validator';
const hotelRouter = express.Router();

hotelRouter.post('/', validateRequestBody(hotelSchema), createHotelHandler);

hotelRouter.get('/:id', validatePathParams(hotelIdParamSchema), getHotelByIdHandler);

hotelRouter.get('/', getAllHotelsHandler);

hotelRouter.put('/:id', validatePathParams(hotelIdParamSchema), validateRequestBody(updateHotelSchema), updateHotelHandler);

hotelRouter.delete('/:id', validatePathParams(hotelIdParamSchema), deleteHotelHandler);
export default hotelRouter;