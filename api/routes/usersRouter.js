import express from "express";

import {
  blockAUser,
  deleteAUser,
  getAllUsers,
  getAllUsersByRole,
  registerAUser,
  unBlockAUser,
  updateLoggedInUserProfile,
  updateUserById,
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
userRouter.put("/:id", authenticate, isAdmin, updateUserById);
userRouter.put("/:id/block", authenticate, isAdmin, blockAUser);
userRouter.put("/:id/un-block", authenticate, isAdmin, unBlockAUser);
userRouter.delete("/:id", authenticate, isAdmin, deleteAUser);

export default userRouter;
