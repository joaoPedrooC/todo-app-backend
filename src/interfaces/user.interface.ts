import { Draft } from "@prisma/client"
import { ITodo } from "./todo.interface"

export interface IUser {
  id: string
  name: string
  email: string
  todos: ITodo[]
  drafts: Draft[]
}

export interface IUserCreate extends Omit<IUser, 'todos' | 'drafts' | 'id'> {
  password: string
}

export type TUserUpdate = Partial<IUserCreate>