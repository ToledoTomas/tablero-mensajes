import { getPostById, getAllPosts, createNewPost } from "../models/posts";

export const getPosts = async (req, res) => {
  try {
    const post = await getAllPosts();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await getPostById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

export const createPost = async (req, res) => {
  const { title, description, categories } = req.body;
  try {
    const post = await createNewPost({ title, description, categories });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el post" });
  }
};
