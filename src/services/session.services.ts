import { AppError } from "../errors/AppError";
import { prisma } from "../database/prisma";

import { userReturnWithoutPassword } from "../schemas/user.schemas";
import { ILoginPayload } from "../interfaces/session.interface";

import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

export class SessionService {
  async login({ email, password }: ILoginPayload) {
    const loggingUser = await prisma.user.findFirst({ where: { email }, include: { todos: true, drafts: true } })

    if(!loggingUser) throw new AppError('Invalid e-mail or password', 401)
    
    const verifyPass = compareSync(password, loggingUser.password)

    if(!verifyPass) throw new AppError('Invalid e-mail or password', 401)

    const token = sign({ id: loggingUser.id}, process.env.SECRET_KEY!, { expiresIn: process.env.EXPIRES_IN!, subject: loggingUser.id})

    return {
      data: userReturnWithoutPassword.parse(loggingUser),
      token
    }
  }
}