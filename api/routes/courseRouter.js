import express from "express";
import {
  createCourse,
  deleteACourse,
  deleteMyCourse,
  enrollCourse,
  getAllCourses,
  getMyCourses,
  getMySpecificCourse,
  getSpecificCourse,
  updateACourse,
  updateMyCourse,
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
courseRouter.get("/my-courses/all", authenticate, getMyCourses);
courseRouter.get("/my-courses/:slug", authenticate, getMySpecificCourse);

// all put endpoints
courseRouter.put("/:slug/enroll", authenticate, enrollCourse); // enroll a course
// admin can update any course
courseRouter.put("/:slug", authenticate, isAdmin, updateACourse);
//  instructor should update a course
courseRouter.put(
  "/my-courses/:slug",
  authenticate,
  isAdmin || isInstructor,
  updateMyCourse
);

// all delete endpoints
courseRouter.delete("/:slug", authenticate, isAdmin, deleteACourse);
courseRouter.delete(
  "/my-courses/:slug",
  authenticate,
  isAdmin || isInstructor,
  deleteMyCourse
);
export default courseRouter;
