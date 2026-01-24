import "dotenv/config"
import {drizzle} from "drizzle-orm/node-postgres"
import express from "express";
import {usersTable,userSessions,urlsTable}from "./db/schema.js"
import { eq,and, isNull, isNotNull } from "drizzle-orm";
import {createHmac, randomBytes} from "node:crypto"
import cookieParser from "cookie-parser"
import {signupPostRequestBodySchema,shortenPostRequestBodySchema} from "./validation/request.validation.js"
import { route } from "./routes/retrieveProblems/retrieveProblems.js";
// create a server
const server = express()
server.use(express.json())

server.get("/retrieveProblems",route);

export default server;