import express from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  isAdmin,
  isAdminOrCourseCreator,
  isAdminOrInstructor,
  isCourseCreator,
} from "../middleware/authorizationMiddleware.js";
import { isCourseCreatorOrAdminOrEnrolled } from "../middleware/authorizationMiddleware.js";
import {
  createAssessment,
  deleteAssessment,
  getSpecificAssessment,
  getAllAssessmentsOfSection,
  updateAnAssessment,
} from "../controllers/assessmentController.js";
const assessmentsRouter = express.Router();

// All Get Routes
assessmentsRouter.get(
  "/:course_slug/:section_id/assessments",
  authenticate,
  isCourseCreatorOrAdminOrEnrolled,
  getAllAssessmentsOfSection
);
assessmentsRouter.get(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  isCourseCreatorOrAdminOrEnrolled,
  getSpecificAssessment
);

// POST ROUTES
assessmentsRouter.post(
  "/:course_slug/:section_id/assessments",
  authenticate,
  isAdminOrCourseCreator,
  createAssessment
);

// PUT ROUTES
assessmentsRouter.put(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  isAdminOrCourseCreator,
  updateAnAssessment
);

// DELETE ROUTES
assessmentsRouter.delete(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  deleteAssessment
  // deleteASection
);
export default assessmentsRouter;
