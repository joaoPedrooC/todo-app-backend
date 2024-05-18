import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export class HandleErrors {
  static execute(err: Error, req: Request, res: Response, next: NextFunction): Response {
    if(err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    if(err instanceof ZodError) {
      return res.status(403).json({ message: err.formErrors.fieldErrors })
    }

    if(err instanceof JsonWebTokenError) {
      return res.status(401).json({ message: err.message })
    }

    console.log(err);
    return res.status(500).json('Internal server error.')
  }
}