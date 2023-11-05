import express from "express";
import {
  createCourse,
  deleteACourse,
  deleteMyCourse,
  enrollCourse,
  getAllCourses,
  getMyCourses,
  getMyEnrolledCourses,
  getMySpecificCourse,
  getSpecificCourse,
  getSpecificCourseLoggedInUserEnrolled,
  updateACourse,
  updateMyCourse,
} from "../controllers/courseController.js";
import { authenticate } from "../middleware/authenticate.js";
import {
  isAdmin,
  isAdminOrInstructor,
  isInstructor,
} from "../middleware/authorizationMiddleware.js";
const courseRouter = express.Router();

// all post endpoints
courseRouter.post("/create", authenticate, isAdminOrInstructor, createCourse);

// all get endpoints
courseRouter.get("/", authenticate, isAdmin, getAllCourses); // only admin
courseRouter.get("/:slug", authenticate, isAdmin, getSpecificCourse); // only admin
courseRouter.get("/my-courses/all", authenticate, getMyCourses);
courseRouter.get("/my-courses/:slug", authenticate, getMySpecificCourse);
courseRouter.get("/enrolled-courses/all", authenticate, getMyEnrolledCourses);
courseRouter.get(
  "/enrolled-courses/:slug",
  authenticate,
  getSpecificCourseLoggedInUserEnrolled
);

// all put endpoints
courseRouter.put("/:slug/enroll", authenticate, enrollCourse); // enroll a course
// admin can update any course
courseRouter.put("/:slug", authenticate, isAdmin, updateACourse);
//  instructor should update a course
courseRouter.put(
  "/my-courses/:slug",
  authenticate,
  isAdminOrInstructor,
  updateMyCourse
);

// all delete endpoints
courseRouter.delete("/:slug", authenticate, isAdmin, deleteACourse);
courseRouter.delete(
  "/my-courses/:slug",
  authenticate,
  isAdminOrInstructor,
  deleteMyCourse
);
export default courseRouter;
