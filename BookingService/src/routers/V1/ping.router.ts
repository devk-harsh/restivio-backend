import express, { Request, Response, NextFunction } from 'express';

import { pingHandler } from '../../controllers/ping.controller';

import {validateQueryParams, validateRequestBody} from '../../validators/index'
import { pingBodySchema, pingQuerySchema } from '../../validators/ping.validator';

const pingRouter = express.Router();

pingRouter.get('/', validateRequestBody(pingBodySchema), validateQueryParams(pingQuerySchema),pingHandler);

pingRouter.post('/', validateRequestBody(pingBodySchema), validateQueryParams(pingQuerySchema),pingHandler);

pingRouter.get('/check', (req,res,next)=>{
    res.status(200).send("Checked");
});
export default pingRouter;




// function middleware1(req : Request,res : Response,next: NextFunction){
//     console.log("Middleware1 is logged");
//     next();

// }
// function middleware2(req : Request,res : Response,next: NextFunction){
//     console.log("Middleware2 is logged");
//     next();
// }

// pingRouter.get('/', middleware1, middleware2, pingHandler);
