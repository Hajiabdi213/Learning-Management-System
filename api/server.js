import express, { json } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/usersRouter.js";
import { notFound } from "./middleware/errorHandler.js";
import courseRouter from "./routes/courseRouter.js";
import sectionsRouter from "./routes/sectionsRouter.js";
import courseCategoryRouter from "./routes/courseCategoryRouter.js";
const server = express();

dotenv.config();
server.use(json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

// routes
server.use("/api/users", userRouter);
server.use("/api/courses", courseRouter);
server.use("/api", sectionsRouter);
server.use("/api/categories", courseCategoryRouter);

server.use(notFound);

export default server;
