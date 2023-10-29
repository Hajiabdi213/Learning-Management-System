import express from "express";
import {
  createCourse,
  deleteACourse,
  enrollCourse,
  getAllCourses,
  getSpecificCourse,
  updateACourse,
} from "../controllers/courseController.js";
import { authenticate } from "../middleware/authenticate.js";
import { isAdmin, isInstructor } from "../middleware/roleAuth.js";
const courseRouter = express.Router();

// all post endpoints
courseRouter.post(
  "/create",
  authenticate,
  isAdmin || isInstructor,
  createCourse
);

// all get endpoints
courseRouter.get("/", authenticate, getAllCourses);
courseRouter.get("/:slug", getSpecificCourse);

// all put endpoints
courseRouter.put("/:slug/enroll", authenticate, enrollCourse); // enroll a course
courseRouter.put(
  "/:slug",
  authenticate,
  isAdmin || isInstructor,
  updateACourse
);

// all delete endpoints
courseRouter.delete("/:slug", authenticate, isAdmin, deleteACourse);

export default courseRouter;
