import { Request, Response } from "express";
import { SessionService } from "../services/session.services";

export class SessionController {
  async login(req: Request, res: Response) {
    const sessionService = new SessionService()

    const loginData = await sessionService.login(req.body)
    return res.status(200).json(loginData)
  }
}