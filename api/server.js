import express, { json } from "express";
import dotenv from "dotenv";
import userRouter from "./routes/usersRouter.js";
import { notFound } from "./middleware/errorHandler.js";
const server = express();

dotenv.config();
server.use(json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

// user
server.use("/api/user", userRouter);

server.use(notFound);

export default server;
