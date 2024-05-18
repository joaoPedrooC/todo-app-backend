import { z } from "zod";

export const todoSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  status: z.boolean(),
  createdAt: z.date(),
  dueDate: z.date(),
  finishedAt: z.date().nullable(),
  ownerId: z.string()
})