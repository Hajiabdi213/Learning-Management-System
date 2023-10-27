import express, { json } from "express";
import dotenv from "dotenv";
import userRouter from "./users.js";
const server = express();

dotenv.config();
server.use(json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

server.use("/api/user", userRouter);

export default server;
