import { NextFunction, Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../errors/AppError";

export class VerifyTodoIdExistsMiddleware {
  static async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const searchingTodo = await prisma.todo.findFirst({ where: { id: req.params.todoId } })

    if(!searchingTodo) throw new AppError('Todo not found.', 404)

    res.locals.foundTodo = searchingTodo
    return next()
  }
}