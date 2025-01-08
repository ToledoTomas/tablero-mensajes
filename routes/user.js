import { Router } from "express";
import { getUsers, getUserById, createUser } from "../controllers/users.js";
import { createUserSchema } from "../models/user.js";
import validateSchema from "../middlewares/validateSchema.js";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/register", validateSchema(createUserSchema), createUser);

export default userRouter;
