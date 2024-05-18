import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

export class VerifyUserIdExists {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const searchingUser = await prisma.user.findFirst({ where: { id: req.params.userId } })

    if(!searchingUser) throw new AppError('User not found.', 404)
    
    return next()
  }
}