import express from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  isAdmin,
  isAdminOrCourseCreator,
  isAdminOrInstructor,
  isCourseCreator,
  isCourseCreatorOrAdminOrEnrolled,
  isEnrolled,
} from "../middleware/authorizationMiddleware.js";
import {
  createAssessment,
  deleteAssessment,
  getSpecificAssessment,
  getAllAssessmentsOfSection,
  updateAnAssessment,
  submitAnAssessment,
  getAllSubmissions,
  gradeASubmission,
  getAllGradedSubmissions,
} from "../controllers/assessmentController.js";
// import {
//   getAssessmentDetails,
//   getAssessmentsForCourse,
// } from "../controllers/assessmentsController.js";
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

assessmentsRouter.get(
  "/:course_slug/:section_id/assessments/:assessment_id/submissions",
  authenticate,
  isAdminOrCourseCreator,
  getAllSubmissions
);

assessmentsRouter.get(
  "/:course_slug/:section_id/assessments/:assessment_id/submissions/graded",
  authenticate,
  isAdminOrCourseCreator,
  getAllGradedSubmissions
);

// POST ROUTES
assessmentsRouter.post(
  "/:course_slug/:section_id/assessments",
  authenticate,
  isAdminOrCourseCreator,
  createAssessment
  // createAssessment
);
assessmentsRouter.post(
  "/:course_slug/:section_id/assessments/:assessment_id/submit",
  authenticate,
  isEnrolled,
  submitAnAssessment
);

// PUT ROUTES
assessmentsRouter.put(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  isAdminOrCourseCreator,
  updateAnAssessment
);
assessmentsRouter.put(
  "/:course_slug/:section_id/assessments/:assessment_id/submissions/:submission_id/grade",
  authenticate,
  isAdminOrCourseCreator,
  gradeASubmission
);

// DELETE ROUTES
assessmentsRouter.delete(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  deleteAssessment
);
export default assessmentsRouter;
