import "dotenv/config"
import express from "express";
import { newUserProblems } from "./routes/retrieveProblems/retrieveProblems.js";
// create a server
const server = express()
server.use(express.json())

server.get("/retrieveProblems/:index",newUserProblems);

export default server;