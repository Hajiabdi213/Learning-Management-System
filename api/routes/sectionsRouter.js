import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import {
  createASection,
  deleteASection,
  getAllCourseSections,
  getSpecificCourseSection,
  updateASection,
} from "../controllers/sectionController.js";
const sectionsRouter = express.Router();

// All Get Routes
sectionsRouter.get("/:course_slug/sections", getAllCourseSections);
sectionsRouter.get("/:course_slug/sections/:id", getSpecificCourseSection);

// POST ROUTES
sectionsRouter.post("/:course_slug/sections", createASection);

// PUT ROUTES
sectionsRouter.put("/:course_slug/sections/:id", updateASection);

// DELETE ROUTES
sectionsRouter.delete("/:course_slug/sections/:id", deleteASection);
export default sectionsRouter;
