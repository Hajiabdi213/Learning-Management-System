import prisma from "../lib/index.js";
import express from "express";

import bcryptjs from "bcryptjs";
import {
  getAllUsers,
  getAllUsersByRole,
  registerAUser,
  userLogin,
} from "../controllers/usersController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isAdmin } from "../middleware/roleAuth.js";

const userRouter = express.Router();

// user signup
userRouter.post("/:role/signup", registerAUser);
userRouter.post("/login", userLogin);
userRouter.get("/get-all", authenticate, isAdmin, getAllUsers);
userRouter.get("/:role/get-all", authenticate, isAdmin, getAllUsersByRole);
// userRouter.get("/:id", )

export default userRouter;
