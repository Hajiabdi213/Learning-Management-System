import prisma from "../lib/index.js";
import express from "express";

import bcryptjs from "bcryptjs";
import {
  getAllUsers,
  registerAUser,
  userLogin,
} from "../controllers/usersController.js";
import { authenticate } from "../middleware/authenticate.js";

const userRouter = express.Router();

// user signup
userRouter.post("/:role/signup", registerAUser);
userRouter.post("/login", userLogin);
userRouter.get("/get-all", authenticate, getAllUsers);
// userRouter.get("/:id", )

export default userRouter;
