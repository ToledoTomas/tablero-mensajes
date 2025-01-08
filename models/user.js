import pool from "../db.js";
import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3, "El username debe contener al menos 4 carácteres").max(255),
    password: z.string()
      .min(6, "El password debe contener al menos 6 caracteres")
      .max(255),
  }),
});

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUser = async id => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};

export const createNewUser = async (username, password) => {
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
    [username, password]
  );
  return result.rows[0];
}
