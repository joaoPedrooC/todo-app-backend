import { z } from "zod"
import { todoUpdateSchema } from "../schemas/todo.schemas"

export interface ITodo {
  id: string
  title: string
  description?: string | null
  status: boolean
  createdAt: Date
  dueDate: Date
  finishedAt: Date | null
  ownerId: string
}

export type TTodoCreate = Omit<ITodo, 'id' | 'status' | 'createdAt' | 'finishedAt' | 'ownerId'>
export type TTodoUpdate = Partial<Omit<ITodo, 'id' | 'createdAt' | 'ownerId'>>