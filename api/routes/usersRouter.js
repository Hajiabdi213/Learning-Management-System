import express from "express";

import {
  blockAUser,
  deleteAUser,
  getAllUsers,
  getAllUsersByRole,
  getLoggedInUserProfile,
  getProfileOfSpecificUser,
  registerAUser,
  unBlockAUser,
  updateLoggedInUserProfile,
  updateUserById,
  userLogin,
} from "../controllers/usersController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isAdmin } from "../middleware/authorizationMiddleware.js";

const userRouter = express.Router();

// all post requests
userRouter.post("/:role/signup", registerAUser); // user signup
userRouter.post("/login", userLogin); // user login

// all get requests
userRouter.get("/", authenticate, isAdmin, getAllUsers); // getting all users (admin)
userRouter.get("/profile", authenticate, getLoggedInUserProfile); // get the profile of logged in user
userRouter.get("/profile/:id", authenticate, isAdmin, getProfileOfSpecificUser); // get the profile of logged in user
userRouter.get("/:role", authenticate, isAdmin, getAllUsersByRole); // getting details of specific user (admin)

// all put requests
userRouter.put("/update", authenticate, updateLoggedInUserProfile); // logged in user updating his/her info(admin/instructor/student)
userRouter.put("/:id", authenticate, isAdmin, updateUserById); // updating the info of specific user (admin)
userRouter.put("/:id/block", authenticate, isAdmin, blockAUser); // blocking a user (admin)
userRouter.put("/:id/un-block", authenticate, isAdmin, unBlockAUser); // unblocking a user (admin)

// all delete requests
userRouter.delete("/:id", authenticate, isAdmin, deleteAUser); // deleting a user (admin)

export default userRouter;
