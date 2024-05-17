import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().max(200),
  email: z.string().email(),
  password: z.string()
})