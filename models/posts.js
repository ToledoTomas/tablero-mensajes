import db from "../db.js";
import { z } from "zod";

export const createPostsSchema = z.object({
  body: z.object({
    title: z
      .string({
        message: "El titulo es requerido",
      })
      .min(3, "El titulo debe contener al menos 4 carácteres")
      .max(255),
    description: z
      .string({
        message: "La descripción es requerida",
      })
      .min(6, "La descripción debe contener al menos 6 caracteres")
      .max(255),
    categories: z.enum([
      "programacion",
      "educacion",
      "negocios",
      "ciberseguridad",
    ]),
  }),
});

export const getAllPosts = async () => {
  const result = await db.any("SELECT * FROM posts");
  return result;
};

export const getPostById = async id => {
  const result = await db.any("SELECT * FROM posts WHERE id = $1", [id]);
  return result;
};

export const createNewPost = async ({ title, description, categories }) => {
  const result = await db.one(
    "INSERT INTO posts (title, description, categories) VALUES ($1, $2, $3) RETURNING *",
    [title, description, categories],
  );
  return result;
};
