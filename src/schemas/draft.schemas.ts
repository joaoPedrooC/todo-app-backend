import { z } from "zod";

export const draftSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  dueDate: z.string().datetime().nullable(),
  ownerId: z.string()
})