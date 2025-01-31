import { Router } from "express";
import { getUsers, getUserById, createUser, deleteUser, login } from "../controllers/users.js";
import { createUserSchema, loginUserSchema } from "../models/user.js";
import validateSchema from "../middlewares/validateSchema.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", validateSchema(createUserSchema), createUser);
userRouter.post("/login", validateSchema(loginUserSchema), login);
userRouter.delete("/:id", deleteUser);

export default userRouter;
