import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { ZodError } from "zod";

export class HandleErrors {
  static execute(err: Error, req: Request, res: Response, next: NextFunction): Response {
    if(err instanceof AppError) {
      return res.status(err.statusCode).json({ message: err.message })
    }

    if(err instanceof ZodError) {
      return res.status(403).json(err.formErrors.fieldErrors)
    }

    console.log(err);
    return res.status(500).json('Internal server error.')
  }
}