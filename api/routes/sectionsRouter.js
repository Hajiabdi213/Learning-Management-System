import express from "express";

import { authenticate } from "../middleware/authenticate.js";
import {
  createASection,
  getAllSections,
  updateASection,
} from "../controllers/sectionController.js";
const sectionsRouter = express.Router();

// All Get Routes
sectionsRouter.get("/get-all", getAllSections);

// POST ROUTES
sectionsRouter.post("/create", createASection);

// PUT ROUTES
sectionsRouter.put("/update", updateASection);
export default sectionsRouter;
