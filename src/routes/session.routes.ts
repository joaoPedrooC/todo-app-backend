import { Router } from "express";
import { SessionController } from "../controllers/session.controllers";
import { ValidateBodyMiddleware } from "../middlewares/validateBody.middleware";
import { sessionSchema } from "../schemas/session.schemas";

export const sessionRouter = Router()

const sessionController = new SessionController()

sessionRouter.post('/', ValidateBodyMiddleware.execute(sessionSchema), sessionController.login)