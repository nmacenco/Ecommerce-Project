import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//configuring origin.
const corsOrigin = cors();

//creating server
const server: Application = express();

//middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(morgan("dev"));
server.use(corsOrigin);

//routes


export default server;