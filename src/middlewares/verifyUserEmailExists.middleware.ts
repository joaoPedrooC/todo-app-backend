import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

export class VerifyUserEmailExists {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const searchingUser = await prisma.user.findFirst({ where: { email: req.params.email  } })

    if(searchingUser) throw new AppError('Email already exists', 409)
    
    return next()
  }
}