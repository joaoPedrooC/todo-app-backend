import { Router } from "express";
import { ValidateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { VerifyPermissionsMiddleware } from "../middlewares/verifyPermissions.middleware";
import { ValidateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { todoCreateSchema } from "../schemas/todo.schemas";
import { TodoController } from "../controllers/todo.controllers";
import { VerifyUserIdExists } from "../middlewares/verifyUserIdExists.middleware";
import { VerifyTodoIdExistsMiddleware } from "../middlewares/verifyTodoIdExists.middleware";

export const todoRouter = Router()
const todoController = new TodoController()

todoRouter.use('/:userId', ValidateTokenMiddleware.execute, VerifyPermissionsMiddleware.execute, VerifyUserIdExists.execute)
todoRouter.post('/:userId', ValidateBodyMiddleware.execute(todoCreateSchema), todoController.create)
todoRouter.delete('/:userId/:todoId', VerifyTodoIdExistsMiddleware.execute, todoController.delete)