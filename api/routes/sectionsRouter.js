import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import {
  createASection,
  deleteASection,
  getAllCourseSections,
  getSpecificCourseSection,
  updateASection,
} from "../controllers/sectionController.js";
import {
  isAdmin,
  isAdminOrCourseCreator,
  isAdminOrInstructor,
  isCourseCreator,
} from "../middleware/authorizationMiddleware.js";
const sectionsRouter = express.Router();

// All Get Routes
sectionsRouter.get(
  "/:course_slug/sections",
  authenticate,
  isAdminOrCourseCreator,
  getAllCourseSections
);
sectionsRouter.get(
  "/:course_slug/sections/:id",
  authenticate,
  isAdminOrCourseCreator,
  getSpecificCourseSection
);

// POST ROUTES
sectionsRouter.post(
  "/:course_slug/sections",
  authenticate,
  isAdminOrCourseCreator,
  createASection
);

// PUT ROUTES
sectionsRouter.put(
  "/:course_slug/sections/:id",
  authenticate,
  isAdminOrCourseCreator,
  updateASection
);

// DELETE ROUTES
sectionsRouter.delete(
  "/:course_slug/sections/:id",
  authenticate,
  isAdminOrCourseCreator,
  deleteASection
);
export default sectionsRouter;
