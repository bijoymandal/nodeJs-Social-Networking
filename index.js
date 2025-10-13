
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
import express from "express";
import cors from "cors";

import userRouter from './src/feature/user/routes/user.routes.js';
import jwtAuth from './src/middleware/jwt.middleware.js';

const server = express();
//middleware to parse json request body
server.use(express.json());
//CROS Policy configuration
var corsOptions = {
    origin:"*"
}
server.use(cors(corsOptions));

//error haandler middleware
server.use((error,req,res,next)=>{
    console.log(error);
    res.status(503).send("Something went wrong,please try later");
});

//default request handler
server.get("/",(req,res)=>{
    res.send("Welcome to Social Media Platform");
});

server.use("/api/users",userRouter);

server.listen(process.env.PORT,()=>{
    console.log(`server is running at ${process.env.PORT}`);
});