import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape } from "zod";
import logger from "../config/logger.config";
/**
 * @param schema - Zod schema to Validate the request body
 * @returns - Middleware function to validate the request body
 * 
 */


export const validateRequestBody = (schema: ZodObject)=>{
    return async(req:Request, res: Response, next: NextFunction)=>{
        try{
            logger.info("Validating request body",);
            await schema.parseAsync(req.body);
            logger.info("Request Body is Valid");
            next();
        }catch(error){
            //If the validation Fails
            logger.error("Request Body is Invalid");
            res.status(400).json({
                message : "Invalid request body",
                success : false,
                error: error
            });
        }
    }
}

export const validateQueryParams = (schema: ZodObject)=>{
    return async(req:Request, res: Response, next: NextFunction)=>{
        try{
            logger.info("Validating Query Param");
            await schema.parseAsync(req.query);
            logger.info("Query Params is Valid");
            next();
        }catch(error){
            //If the validation Fails
            logger.error("Query Params is Invalid");
            res.status(400).json({
                message : "Invalid Query Params",
                success : false,
                error: error
            });
        }
    }
}

export const validateRequestParams = (schema: ZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.info("Validating route params");
            await schema.parseAsync(req.params);
            logger.info("Route params are valid");
            next();
        } catch (error) {
            logger.error("Route params are invalid");
            res.status(400).json({
                message: "Invalid route params",
                success: false,
                error: error
            });
        }
    };
};
/*

                                You can even do this 
type ValidationSchemas = {
  body?: ZodObject<ZodRawShape>;
  query?: ZodObject<ZodRawShape>;
  params?: ZodObject<ZodRawShape>;
};

export const validate = (schemas: ValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate body
      if (schemas.body) {
        await schemas.body.parseAsync(req.body);
        console.log("Request body is valid");
      }

      // Validate query params
      if (schemas.query) {
        await schemas.query.parseAsync(req.query);
        console.log("Query params are valid");
      }

      // Validate route params (optional)
      if (schemas.params) {
        await schemas.params.parseAsync(req.params);
        console.log("Route params are valid");
      }

      next();
    } catch (error) {
      console.error("Validation failed:", error);
      return res.status(400).json({
        message: "Invalid request data",
        success: false,
        error,
      });
    }
  };
};
*/