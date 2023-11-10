import express from "express";
import {
  createCourseCategory,
  deleteACategory,
  getAllCourseCategories,
  getSpecificCourseCategory,
  updateSpecificCategory,
} from "../controllers/courseCategoryController.js";
import { isAdminOrInstructor } from "../middleware/authorizationMiddleware.js";
import { authenticate } from "../middleware/authenticate.js";
const courseCategoryRouter = express.Router();

// all post requests
courseCategoryRouter.post(
  "/",
  authenticate,
  isAdminOrInstructor,
  createCourseCategory
); // creating a course category (admin or instructor)

// all get  requests
courseCategoryRouter.get("/", authenticate, getAllCourseCategories); // getting all categories (admin, instructor, and student)
courseCategoryRouter.get("/:slug", authenticate, getSpecificCourseCategory); // getting details of specific category (admin, instructor and student)

// all post endpoints
courseCategoryRouter.put(
  "/:slug",
  authenticate,
  isAdminOrInstructor,
  updateSpecificCategory
); // updating an specific category (admin or instructor)

// all delete endpoints
courseCategoryRouter.delete(
  "/:slug",
  authenticate,
  isAdminOrInstructor,
  deleteACategory
); // deleting a category (admin or instructor)

export default courseCategoryRouter;
