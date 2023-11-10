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
  isCourseCreatorOrAdminOrEnrolled,
} from "../middleware/authorizationMiddleware.js";
const sectionsRouter = express.Router();

// All Get Routes
sectionsRouter.get(
  "/:course_slug/sections",
  authenticate,
  isCourseCreatorOrAdminOrEnrolled,
  getAllCourseSections
); // getting all content the sections of the course (admin/ instructor/ enrolled-student)
sectionsRouter.get(
  "/:course_slug/sections/:id",
  authenticate,
  isCourseCreatorOrAdminOrEnrolled,
  getSpecificCourseSection
); // getting all the content of specific section  (admin/instructor/ enrolled-student)

// POST ROUTES
sectionsRouter.post(
  "/:course_slug/sections",
  authenticate,
  isAdminOrCourseCreator,
  createASection
); // creating a section for specific course (admin or instructor(course creator))

// PUT ROUTES
sectionsRouter.put(
  "/:course_slug/sections/:id",
  authenticate,
  isAdminOrCourseCreator,
  updateASection
); // updating a section for specific course (admin or instructor (course creator))

// DELETE ROUTES
sectionsRouter.delete(
  "/:course_slug/sections/:id",
  authenticate,
  isAdminOrCourseCreator,
  deleteASection
); // deleting a section for specific course (admin or instructor (course creator))
export default sectionsRouter;
