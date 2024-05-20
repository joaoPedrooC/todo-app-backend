import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable().optional(),
  status: z.boolean(),
  createdAt: z.date(),
  dueDate: z.string().datetime(),
  finishedAt: z.string().datetime().nullable(),
  ownerId: z.string()
})

export const todoCreateSchema = todoSchema.omit({ id: true, ownerId: true, status: true, finishedAt: true, createdAt: true })
export const todoUpdateSchema = todoSchema.omit({ id: true, createdAt: true, finishedAt: true, ownerId: true}).partial()