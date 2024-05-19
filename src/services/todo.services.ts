import { prisma } from "../database/prisma";
import { ITodo, TTodoCreate } from "../interfaces/todo.interface";

export class TodoService {
  async create(payload: TTodoCreate, ownerId: string) {
    const newTodoBody: Omit<ITodo, 'id' | 'createdAt' | 'finishedAt' | 'status'> = {
      ...payload,
      ownerId
    }

    const newTodo = await prisma.todo.create({ data: newTodoBody })

    return newTodo
  }
}