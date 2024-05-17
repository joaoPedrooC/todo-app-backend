import { z } from "zod";

export const draftSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  dueDate: z.date().nullable(),
  ownerId: z.string()
})