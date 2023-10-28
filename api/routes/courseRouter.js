import express from "express";
import {
  createCourse,
  enrollCourse,
  getAllCourses,
  getSpecificCourse,
} from "../controllers/courseController.js";
import { authenticate } from "../middleware/authenticate.js";
const courseRouter = express.Router();

// all post endpoints
courseRouter.post("/create", createCourse);

// all get endpoints
courseRouter.get("/get-all", getAllCourses);
courseRouter.get("/:slug", getSpecificCourse);

// Enroll Course
courseRouter.put("/:slug/enroll", authenticate, enrollCourse);

export default courseRouter;
