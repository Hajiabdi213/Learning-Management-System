import express from "express";
import {
  createCourseCategory,
  deleteACategory,
  getAllCourseCategories,
  getSpecificCourseCategory,
  updateSpecificCategory,
} from "../controllers/courseCategoryController.js";
import { isAdminOrInstructor } from "../middleware/roleAuth.js";
import { authenticate } from "../middleware/authenticate.js";
const courseCategoryRouter = express.Router();

// all post requests
courseCategoryRouter.post(
  "/",
  authenticate,
  isAdminOrInstructor,
  createCourseCategory
);

// all get  requests
courseCategoryRouter.get("/", authenticate, getAllCourseCategories);
courseCategoryRouter.get("/:slug", authenticate, getSpecificCourseCategory);

// all post endpoints
courseCategoryRouter.put(
  "/:slug",
  authenticate,
  isAdminOrInstructor,
  updateSpecificCategory
);

// all delete endpoints
courseCategoryRouter.delete(
  "/:slug",
  authenticate,
  isAdminOrInstructor,
  deleteACategory
);

export default courseCategoryRouter;
