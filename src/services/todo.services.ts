import { prisma } from "../database/prisma";
import { ITodo, TTodoCreate } from "../interfaces/todo.interface";

export class TodoService {
  async create(payload: TTodoCreate, ownerId: string): Promise<ITodo> {
    const newTodoBody: Omit<ITodo, 'id' | 'createdAt' | 'finishedAt' | 'status'> = {
      ...payload,
      ownerId
    }

    const newTodo: ITodo = await prisma.todo.create({ data: newTodoBody })

    return newTodo
  }

  async delete(todoId: string): Promise<void> {
    await prisma.todo.delete({ where: { id: todoId } })
  }
}