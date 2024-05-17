import { Router } from "express";
import { UserController } from "../controllers/user.controllers";

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/', userController.create)