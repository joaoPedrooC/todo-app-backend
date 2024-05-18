import { Request, Response } from "express";
import { UserService } from "../services/user.services";
import { IUser } from "../interfaces/user.interface";

export class UserController {
  async create(req: Request, res: Response): Promise<Response> {
    const userService = new UserService()
    const newUser: IUser = await userService.create(req.body)

    return res.status(201).json(newUser)
  }

  async update(req: Request, res: Response): Promise<Response> {
    const userService = new UserService()
    const updatedUser: IUser = await userService.update(req.body, req.params.userId)

    return res.status(200).json(updatedUser)
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params
    const userService = new UserService()
    
    await userService.delete(userId)

    return res.status(204).json()
  }
}