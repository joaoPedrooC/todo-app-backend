import { prisma } from "../database/prisma";
import { IUser, IUserCreate } from "../interfaces/user.interface";

export class UserService {
  async create(payload: IUserCreate): Promise<IUser> {
    const newUser = await prisma.user.create({ data: payload, include: { todos: true, drafts: true } })

    return newUser
  }
}