import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { ValidateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { createUserSchema } from "../schemas/user.schemas";

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/', ValidateBodyMiddleware.execute(createUserSchema), userController.create)