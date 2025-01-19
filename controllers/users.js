import {
  getAllUsers,
  getUser,
  createNewUser,
  loginUser,
  removeUser,
} from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener el usuario con id ${id}` });
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await createNewUser({ username, password: hashedPassword });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser({ username, password });
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );
    res
      // .cookie("access_token", token, {
      //   httpOnly: true,
      //   secure: process.env.NODE_ENV === "production",
      //   sameSite: "strict",
      //   maxAge: 1000 * 60 * 60,
      // })
      .status(200)
      .json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await removeUser(id);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al eliminar el usuario con id ${id}` });
  }
};
