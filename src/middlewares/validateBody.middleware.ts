import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export class ValidateBodyMiddleware {
  static execute(schema: ZodTypeAny) {
    return (req: Request, res: Response, next: NextFunction) => {
      req.body = schema.parse(req.body)

      return next()
    }
  }
}