import { Router } from "express";
import { getPosts, getPost, createPost } from "../controllers/posts";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createPostsSchema } from "../models/posts";

const postsRouter = Router();

postsRouter.get("/", getPosts);
postsRouter.get("/:id", getPost);
postsRouter.post("/", validateSchema(createPostsSchema), createPost);

export default postsRouter;
