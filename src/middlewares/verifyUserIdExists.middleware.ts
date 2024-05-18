import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";
import { userReturnWithoutPassword } from "../schemas/user.schemas";

export class VerifyUserIdExists {
  static async execute(req: Request, res: Response, next: NextFunction) {
    const searchingUser = await prisma.user.findFirst({ where: { id: req.params.userId }, include: { todos: true, drafts: true } })

    if(!searchingUser) throw new AppError('User not found.', 404)

    const savingUser = userReturnWithoutPassword.parse(searchingUser)
    res.locals.user = savingUser
    
    return next()
  }
}