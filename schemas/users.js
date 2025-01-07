import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, "El username es obligatorio").max(255),
    password: z.string().min(6, "El password debe contener al menos 6 caracteres").max(255),
  }),
});
