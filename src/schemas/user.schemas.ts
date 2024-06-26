import { z } from "zod";
import { todoSchema } from "./todo.schemas";
import { draftSchema } from "./draft.schemas";

export const createUserSchema = z.object({
  name: z.string().max(200),
  email: z.string().email(),
  password: z.string()
})

export const userReturnWithoutPassword = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  todos: z.array(z.any()),
  drafts: z.array(z.any())
})

export const updateUserSchema = z.object({
  name: z.string().max(200).optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
})