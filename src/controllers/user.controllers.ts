import { Request, Response } from "express";
import { UserService } from "../services/user.services";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userService = new UserService()
    const newUser = await userService.create(req.body)

    return res.status(201).json(newUser)
  }
}