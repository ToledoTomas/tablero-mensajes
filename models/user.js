import db from "../db.js";
import { z } from "zod";
import bcrypt from "bcrypt";

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string({
        message: "El username es requerido",
      })
      .min(3, "El username debe contener al menos 4 carácteres")
      .max(255),
    password: z
      .string({
        message: "El password es requerido",
      })
      .min(6, "El password debe contener al menos 6 caracteres")
      .max(255),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

export const getAllUsers = async () => {
  const result = await db.any("SELECT * FROM users");
  return result;
};

export const getUser = async id => {
  const result = await db.one("SELECT * FROM users WHERE id = $1", [id]);
  return result;
};

export const createNewUser = async ({ username, password }) => {
  const result = await db.one(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password],
  );
  return result;
};

export const loginUser = async ({ username, password }) => {
  const result = await db.oneOrNone("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  if (!result) {
    throw new Error("Usuario no encontrado");
  }


  const isValidPassword = await bcrypt.compare(password, result.password);
  if (!isValidPassword) {
    throw new Error("Contraseña incorrecta");
  }

  const { password: _, ...userWithoutPassword } = result;

  return userWithoutPassword;
};

export const removeUser = async id => {
  const result = await db.one("DELETE FROM users WHERE id = $1 RETURNING *", [
    id,
  ]);
  return result;
};
