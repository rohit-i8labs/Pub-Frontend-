import { z } from "zod"
export const userLoginSchema = z.object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" })
      .max(32, { message: "Username is too long" }),
    password:z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(32, { message: "Password is too long" })
  })