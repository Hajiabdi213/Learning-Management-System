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
  isCourseCreator,
} from "../middleware/authorizationMiddleware.js";
const courseRouter = express.Router();

// all post endpoints
courseRouter.post("/create", authenticate, isAdminOrInstructor, createCourse); // creating a course (admin or instructor)

// all get endpoints
courseRouter.get("/", getAllCourses); // getting all courses details (sections and lessons are not included) - (everyone)
courseRouter.get("/:slug", getSpecificCourse); // getting all courses details of specific course (sections and lessons are not included) - (everyone)
courseRouter.get(
  "/my-courses/all",
  authenticate,
  isAdminOrInstructor,
  getMyCourses
); // getting the details of all the courses in which the logged in user created (admin / instructor)
courseRouter.get(
  "/my-courses/:slug",
  authenticate,
  isAdminOrInstructor,
  getMySpecificCourse
); // getting the details of specific  course in which the logged in user created (admin / instructor)
courseRouter.get("/enrolled-courses/all", authenticate, getMyEnrolledCourses); // getting the details of all the courses in which the logged in user enrolled (admin/instructor/student)
courseRouter.get(
  "/enrolled-courses/:slug",
  authenticate,
  getSpecificCourseLoggedInUserEnrolled
); // getting the details of specific  course in which the logged in user enrolled (admin/instructor / student)

// all put endpoints
courseRouter.put("/:slug/enroll", authenticate, enrollCourse); // enrolling a course (admin/instructor/ student)
courseRouter.put("/:slug", authenticate, isAdmin, updateACourse); // updating an specific course (admin)

courseRouter.put(
  "/my-courses/:course_slug",
  authenticate,
  isCourseCreator,
  updateMyCourse
); // updating the course you created (admin or instructor that created the course)

// all delete endpoints
courseRouter.delete("/:slug", authenticate, isAdmin, deleteACourse); // deleting an specific course (admin)
courseRouter.delete(
  "/my-courses/:course_slug",
  authenticate,
  isCourseCreator,
  deleteMyCourse
); // deleting the course you own or created (admin or instructor that created the course)
export default courseRouter;
