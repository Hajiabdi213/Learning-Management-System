import express from "express";
import {
  createCourseCategory,
  getAllCourseCategories,
  getSpecificCourseCategory,
} from "../controllers/courseCategoryController.js";
import { isAdminOrInstructor } from "../middleware/roleAuth.js";
const courseCategoryRouter = express.Router();

// all post requests
courseCategoryRouter.post("/", isAdminOrInstructor, createCourseCategory);

// all get  requests
courseCategoryRouter.get("/", getAllCourseCategories);
courseCategoryRouter.get("/:slug", getSpecificCourseCategory);

export default courseCategoryRouter;
