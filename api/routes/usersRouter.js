import express from "express";

import {
  getAllUsers,
  getAllUsersByRole,
  registerAUser,
  updateLoggedInUserProfile,
  userLogin,
} from "../controllers/usersController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isAdmin } from "../middleware/roleAuth.js";

const userRouter = express.Router();

// user signup
userRouter.post("/:role/signup", registerAUser);
userRouter.post("/login", userLogin);
userRouter.get("/", authenticate, isAdmin, getAllUsers);
userRouter.get("/:role", authenticate, isAdmin, getAllUsersByRole);
userRouter.put("/update", authenticate, updateLoggedInUserProfile);

export default userRouter;
