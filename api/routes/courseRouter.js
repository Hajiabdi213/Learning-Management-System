import express from "express";
import {
  createCourse,
  getAllCourses,
  getSpecificRouter,
} from "../controllers/courseController.js";
const courseRouter = express.Router();

// all post endpoints
courseRouter.post("/create", createCourse);

// all get endpoints
courseRouter.get("/get-all", getAllCourses);
courseRouter.get("/:slug", getSpecificRouter);

export default courseRouter;
