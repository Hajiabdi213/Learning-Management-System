import prisma from "../lib/index.js";
import express from "express";

import bcryptjs from "bcryptjs";
import { registerAUser, userLogin } from "../controllers/usersController.js";

const userRouter = express.Router();

// user signup
userRouter.post("/:role/signup", registerAUser);
userRouter.post("/login", userLogin);

export default userRouter;
