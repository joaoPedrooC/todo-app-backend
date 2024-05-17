import { Draft, Todo } from "@prisma/client"

export interface IUser {
  id: string
  name: string
  email: string
  todos: Todo[]
  drafts: Draft[]
}

export interface IUserCreate extends Omit<IUser, 'todos' | 'drafts'> {
  password: string
}