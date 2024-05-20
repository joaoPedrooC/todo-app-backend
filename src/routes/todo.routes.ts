import { Router } from "express";
import { ValidateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { VerifyPermissionsMiddleware } from "../middlewares/verifyPermissions.middleware";
import { ValidateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { todoCreateSchema, todoUpdateSchema } from "../schemas/todo.schemas";
import { TodoController } from "../controllers/todo.controllers";
import { VerifyUserIdExists } from "../middlewares/verifyUserIdExists.middleware";
import { VerifyTodoIdExistsMiddleware } from "../middlewares/verifyTodoIdExists.middleware";

export const todoRouter = Router()
const todoController = new TodoController()

todoRouter.use('/user/:userId', ValidateTokenMiddleware.execute, VerifyPermissionsMiddleware.execute, VerifyUserIdExists.execute)
todoRouter.post('/user/:userId', ValidateBodyMiddleware.execute(todoCreateSchema), todoController.create)
todoRouter.patch('/user/:userId/todo/:todoId', VerifyTodoIdExistsMiddleware.execute, ValidateBodyMiddleware.execute(todoUpdateSchema), todoController.update)
todoRouter.delete('/user/:userId/todo/:todoId', VerifyTodoIdExistsMiddleware.execute, todoController.delete)