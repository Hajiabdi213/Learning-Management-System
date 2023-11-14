import express from "express";

import { authenticate } from "../middleware/authenticate.js";

import {
  isAdminOrCourseCreator,
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
  getMySubmissions,
} from "../controllers/assessmentController.js";

const assessmentsRouter = express.Router();

// All Get Routes
assessmentsRouter.get(
  "/:course_slug/:section_id/assessments",
  authenticate,
  isCourseCreatorOrAdminOrEnrolled,
  getAllAssessmentsOfSection
); //  getting all the assessments of specific section (admin, instructor-(course creator), student (enrolled student))
assessmentsRouter.get(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  isCourseCreatorOrAdminOrEnrolled,
  getSpecificAssessment
); // Getting the detail specific assessment

assessmentsRouter.get(
  "/:course_slug/:section_id/assessments/:assessment_id/submissions",
  authenticate,
  isAdminOrCourseCreator,
  getAllSubmissions
); // getting the details of submissions of specific course (admin or instructor - course creator)

assessmentsRouter.get(
  "/:course_slug/:section_id/assessments/:assessment_id/submissions/graded",
  authenticate,
  isAdminOrCourseCreator,
  getAllGradedSubmissions
); // getting the details of graded submissions of specific course (admin or instructor - course creator)
assessmentsRouter.get(
  "/:course_slug/:section_id/assessments/:assessment_id/my_submissions",
  authenticate,
  isEnrolled,
  getMySubmissions
); // getting your submissions (only enrolled user)

// POST ROUTES
assessmentsRouter.post(
  "/:course_slug/:section_id/assessments",
  authenticate,
  isAdminOrCourseCreator,
  createAssessment
); // creating an assessment (admin or course creator)
assessmentsRouter.post(
  "/:course_slug/:section_id/assessments/:assessment_id/submit",
  authenticate,
  isEnrolled,
  submitAnAssessment
); // submitting an assessment (student (enrolled student))

// PUT ROUTES
assessmentsRouter.put(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  isAdminOrCourseCreator,
  updateAnAssessment
); // updating an assessment (admin, instructor - course creator)
assessmentsRouter.put(
  "/:course_slug/:section_id/assessments/:assessment_id/submissions/:submission_id/grade",
  authenticate,
  isAdminOrCourseCreator,
  gradeASubmission
); // grading a submission (admin, instructor (course creator))

// DELETE ROUTES
assessmentsRouter.delete(
  "/:course_slug/:section_id/assessments/:assessment_id",
  authenticate,
  isAdminOrCourseCreator,
  deleteAssessment
); //deleting an assessment (admin, instructor (course creator))
export default assessmentsRouter;
