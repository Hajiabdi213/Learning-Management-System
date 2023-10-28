import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import {
  createASection,
  getAllSections,
} from "../controllers/sectionController.js";
const sectionsRouter = express.Router();

// All Get Routes
sectionsRouter.get("/get-all", getAllSections);

// POST ROUTES
sectionsRouter.post("/create", createASection);
export default sectionsRouter;
