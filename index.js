import fs from 'fs';
import express from "express";
import cors from "cors";

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

// server.

server.listen(3200,()=>{
    console.log("server is running at 3200");
});