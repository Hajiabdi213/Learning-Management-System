import express from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  isAdmin,
  isAdminOrCourseCreator,
  isAdminOrInstructor,
  isCourseCreator,
} from "../middleware/roleAuth.js";
import {
  createALesson,
  deleteALesson,
  getAllLessonsOfSection,
  getSpecificLesson,
  updateALesson,
} from "../controllers/lessonController.js";
const lessonsRouter = express.Router();

// All Get Routes
lessonsRouter.get(
  "/:course_slug/:section_id/lessons",
  authenticate,
  isAdminOrCourseCreator,
  getAllLessonsOfSection
);
lessonsRouter.get(
  "/:course_slug/:section_id/lesson/:lesson_id",
  authenticate,
  isAdminOrCourseCreator,
  getSpecificLesson
);

// POST ROUTES
lessonsRouter.post(
  "/:course_slug/:section_id",
  authenticate,
  isAdminOrCourseCreator,
  createALesson
);

// PUT ROUTES
lessonsRouter.put(
  "/:course_slug/:section_id/lesson/:lesson_id",
  authenticate,
  isAdminOrCourseCreator,
  updateALesson
);

// DELETE ROUTES
lessonsRouter.delete(
  "/:course_slug/:section_id/lesson/:lesson_id",
  authenticate,
  deleteALesson
  // deleteASection
);
export default lessonsRouter;
