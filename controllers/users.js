import {
  getAllUsers,
  getUser,
  createNewUser,
  loginUser,
} from "../models/user.js";
import bcrypt from "bcrypt";

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
  console.log("USERNAME CONTROLLER", username);
  console.log("PASSWORD CONTROLLER", password);
  try {
    const user = await loginUser({ username, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
