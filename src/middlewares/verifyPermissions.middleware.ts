import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

export class VerifyPermissionsMiddleware {
  static execute(req: Request, res: Response, next: NextFunction) {
    const { tokenInfo } = res.locals

    if(req.params.userId !== tokenInfo.id) throw new AppError('Insufficient permission', 403)

    return next()
  }
}