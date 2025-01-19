import { Router } from "express";
import userRouter from "./user.js";
import postsRouter from "./posts.js";

const routes = Router();

routes.use("/users", userRouter);
routes.use("/posts", postsRouter);

export default routes;
