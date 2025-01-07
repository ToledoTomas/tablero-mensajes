import pool from "../db.js";

export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const getUser = async id => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0];
};
