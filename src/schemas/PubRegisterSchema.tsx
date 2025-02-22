import { z } from "zod"

export const PubRegisterSchema = z.object({
    name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(32, { message: "Name is too long" }),
    description: z
        .string()
        .min(10, { message: "Description must be at least 10 characters" })
        .max(60, { message: "Description is too long" }),
    owner: z
        .string()
        .min(1, { message: "Username must be at least 1 characters" })
        .max(32, { message: "Username is too long" }),

})