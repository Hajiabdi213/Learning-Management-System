import express, { json } from "express";
const server = express();
import dotenv from "dotenv";
dotenv.config();

server.use(json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server" });
});

export default server;
