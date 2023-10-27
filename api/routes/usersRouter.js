import prisma from "../lib/index.js";
import express from "express";

import bcryptjs from "bcryptjs";
import { registerAUser } from "../controllers/usersController.js";

const userRouter = express.Router();

// admin signup
userRouter.post("/:role/signup", registerAUser);

// instructor signup

// student signup

export default userRouter;
