import express, { json } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/usersRouter.js";
import { notFound } from "./middleware/errorHandler.js";
import courseRouter from "./routes/courseRouter.js";
const server = express();

dotenv.config();
server.use(json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

// routes
server.use("/api/user", userRouter);
server.use("/api/course", courseRouter);

server.use(notFound);

export default server;
