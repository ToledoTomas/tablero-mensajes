import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);

export default userRouter;
