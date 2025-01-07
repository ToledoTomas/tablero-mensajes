import { Router } from "express";
import { getUsers, getUserById } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);

export default userRouter;
