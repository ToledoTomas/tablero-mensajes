import { getAllUsers, getUser, createNewUser } from "../models/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUser(id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const newUser = await createNewUser(username, password);
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
