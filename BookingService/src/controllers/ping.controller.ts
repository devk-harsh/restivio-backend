import {NextFunction, Request, Response} from "express";
import fs from "fs/promises";
import { AppError } from "../utils/errors/app.error";
import logger from "../config/logger.config";
export const pingHandler = async(req: Request, res: Response, next: NextFunction) =>{
    try{
        //await fs.readFile("sample");
        logger.info("Ping request received");
        res.status(200).json({message: "Pong!"});
    } catch(error){
        next(new AppError("Random Server Error", 502));
        //throw new AppError("Internal Server Error", 500); 
        // This can also work as its a rejected promise and so next(err) is automatically trigerred in Express 5
    }
    
};











// export const pingHandler = (req: Request, res: Response) =>{
//     console.log(req.body);
//     res.json({
//         message: 'Pong',
//         success: true,
//     });
// };









/*res.json({....}) ===> res = function (){res.setJsonResponse({....}); return res;}
res.status({....}) ===> res = function (){res.setStatus({....}); return res;}
Read Builder design Pattern for understanding this..*/