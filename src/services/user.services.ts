import { prisma } from "../database/prisma";
import { IUser, IUserCreate, TUserUpdate } from "../interfaces/user.interface";
import { hashSync } from 'bcryptjs'
import { userReturnWithoutPassword } from "../schemas/user.schemas";

export class UserService {
  async create(payload: IUserCreate): Promise<IUser> {
    const hashPassword = hashSync(payload.password, 12)
    payload = { ...payload, password: hashPassword }
    
    const newUser = await prisma.user.create({ data: payload, include: { todos: true, drafts: true } })

    return userReturnWithoutPassword.parse(newUser)
  }

  async update(payload: TUserUpdate, userId: string): Promise<IUser> {
    const updatingUser: IUser = await prisma.user.update({
      data: payload,
      where: { id: userId },
      include: { todos: true, drafts: true }
    })

    return updatingUser
  }
}