import express from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  isAdmin,
  isAdminOrCourseCreator,
  isAdminOrInstructor,
  isCourseCreator,
  isCourseCreatorOrAdminOrEnrolled,
} from "../middleware/authorizationMiddleware.js";
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
  isCourseCreatorOrAdminOrEnrolled,
  getAllLessonsOfSection
); // getting all the lessons of specific section (admin/instructor-course creator / student - enrolled student)
lessonsRouter.get(
  "/:course_slug/:section_id/lesson/:lesson_id",
  authenticate,
  isCourseCreatorOrAdminOrEnrolled,
  getSpecificLesson
); // getting the content of specific lesson on  specific section (admin/instructor-course creator / student - enrolled student)

// POST ROUTES
lessonsRouter.post(
  "/:course_slug/:section_id",
  authenticate,
  isAdminOrCourseCreator,
  createALesson
); // creating a lesson (admin or instructor - course creator)

// PUT ROUTES
lessonsRouter.put(
  "/:course_slug/:section_id/lesson/:lesson_id",
  authenticate,
  isAdminOrCourseCreator,
  updateALesson
); // updating a lesson (admin or instructor - course creator)

// DELETE ROUTES
lessonsRouter.delete(
  "/:course_slug/:section_id/lesson/:lesson_id",
  authenticate,
  isAdminOrCourseCreator, // deleting a lesson (admin or instructor - course creator)
  deleteALesson
  // deleteASection
);
export default lessonsRouter;
