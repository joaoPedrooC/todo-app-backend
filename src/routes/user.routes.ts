import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { ValidateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { createUserSchema, updateUserSchema } from "../schemas/user.schemas";
import { VerifyUserEmailExists } from "../middlewares/verifyUserEmailExists.middleware";
import { VerifyUserIdExists } from "../middlewares/verifyUserIdExists.middleware";
import { ValidateTokenMiddleware } from "../middlewares/validateToken.middleware";
import { VerifyPermissionsMiddleware } from "../middlewares/verifyPermissions.middleware";

export const userRouter = Router()
const userController = new UserController()

userRouter.post('/', ValidateBodyMiddleware.execute(createUserSchema), VerifyUserEmailExists.execute, userController.create)
userRouter.get('/:userId', VerifyUserIdExists.execute, ValidateTokenMiddleware.execute, VerifyPermissionsMiddleware.execute, userController.getOne)
userRouter.patch('/:userId', ValidateBodyMiddleware.execute(updateUserSchema), VerifyUserIdExists.execute, ValidateTokenMiddleware.execute, VerifyPermissionsMiddleware.execute, VerifyUserEmailExists.execute, userController.update)
userRouter.delete('/:userId', VerifyUserIdExists.execute, ValidateTokenMiddleware.execute, VerifyPermissionsMiddleware.execute, userController.delete)