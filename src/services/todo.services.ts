import { prisma } from "../database/prisma";
import { ITodo, TTodoCreate, TTodoUpdate } from "../interfaces/todo.interface";

export class TodoService {
  async create(payload: TTodoCreate, ownerId: string): Promise<ITodo> {
    const newTodoBody: Omit<ITodo, 'id' | 'createdAt' | 'finishedAt' | 'status'> = {
      ...payload,
      ownerId
    }

    const newTodo: ITodo = await prisma.todo.create({ data: newTodoBody })

    return newTodo
  }

  async update(payload: TTodoUpdate, todoId: string): Promise<ITodo> {
    const updatingTodo = await prisma.todo.findFirst({ where: { id: todoId } })

    let finishedAt: null | Date = updatingTodo!.finishedAt
    if(payload.status !== undefined) {
      finishedAt = payload.status ? new Date() : null
    }

    return await prisma.todo.update({ data: { ...payload, finishedAt }, where: { id: todoId } })
  }

  async delete(todoId: string): Promise<void> {
    await prisma.todo.delete({ where: { id: todoId } })
  }
}