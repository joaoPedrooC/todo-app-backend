import { Request, Response } from "express";
import { TodoService } from "../services/todo.services";

export class TodoController {
  async create(req: Request, res: Response): Promise<Response> {
    const todoService = new TodoService()

    const ownerId: string = res.locals.user.id
    const newTodo = await todoService.create(req.body, ownerId)

    return res.status(201).json(newTodo)
  }

  async update(req: Request, rest: Response): Promise<Response> {
    const todoService = new TodoService()
    const updatedTodo = await todoService.update(req.body, req.params.todoId)

    return rest.status(200).json(updatedTodo)
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { todoId } = req.params
    const todoService = new TodoService()

    await todoService.delete(todoId)
    return res.status(204).json()
  }
}