import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { ValidateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas";
import { VerifyUserEmailExists } from "../middlewares/verifyUserEmailExists.middleware";
import { VerifyUserIdExists } from "../middlewares/verifyUserIdExists.middleware";

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/', ValidateBodyMiddleware.execute(createUserSchema), VerifyUserEmailExists.execute, userController.create)
userRouter.patch('/:userId', ValidateBodyMiddleware.execute(updateUserSchema), VerifyUserIdExists.execute, VerifyUserEmailExists.execute, userController.update)
// Controller e Service de atualização e Schema de Sessão (ainda não fiz o schema de login).