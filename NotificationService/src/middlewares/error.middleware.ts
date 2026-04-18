import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors/app.error";


export const genericErrorHandler = (err:unknown, req:Request, res:Response, next:NextFunction) => {
  if (err instanceof AppError) {
    console.log(err);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Unknown / programming error
  console.error("UNEXPECTED ERROR ", err);
  return res.status(501).json({
    success: false,
    message: "Internal Server Error",
  });
};