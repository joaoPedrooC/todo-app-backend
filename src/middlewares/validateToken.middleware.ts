import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";
import { verify } from "jsonwebtoken";

export class ValidateTokenMiddleware {
  static execute(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization) throw new AppError('Missing bearer token', 401)

    const [_, token] = authorization.split(' ')
    const decoded = verify(token, process.env.SECRET_KEY!)

    res.locals.tokenInfo = decoded
    return next()
  }
}