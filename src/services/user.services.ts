import { prisma } from "../database/prisma";
import { IUser, IUserCreate } from "../interfaces/user.interface";
import { hashSync } from 'bcryptjs'
import { userReturnWithoutPassword } from "../schemas/user.schemas";

export class UserService {
  async create(payload: IUserCreate): Promise<IUser> {
    const hashPassword = hashSync(payload.password, 12)
    payload = { ...payload, password: hashPassword }
    
    const newUser = await prisma.user.create({ data: payload, include: { todos: true, drafts: true } })

    return userReturnWithoutPassword.parse(newUser)
  }
}