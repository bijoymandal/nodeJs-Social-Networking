
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import swagger from "swagger-ui-express";
import loggerMiddleware from "./src/middleware/logger.middleware.js";
import express from "express";
import cors from "cors";

import userRouter from './src/feature/user/routes/user.routes.js';
import jwtAuth from './src/middleware/jwt.middleware.js';
import postRouter from "./src/feature/post/routes/post.routes.js";
import commentRouter from "./src/feature/comments/routes/comments.routes.js";
import likeRouter from "./src/feature/likes/routes/like.routes.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";

const port = process.env.PORT || 3200;
const apiDocs = JSON.parse(
  fs.readFileSync(new URL("./swagger.json", import.meta.url), "utf-8")
);
const server = express();
//middleware to parse json request body
server.use(express.json());
//CROS Policy configuration
var corsOptions = {
    origin:"*"
}
server.use(cors(corsOptions));
server.use('/api-docs', swagger.serve, swagger.setup(apiDocs));
//appply logger middleware globally
server.use(loggerMiddleware);

//error haandler middleware
server.use((error,req,res,next)=>{
    console.log(error);
    if(error instanceof ApplicationError)
    {
      res.status(error.code).send(error.message);  
    }
    res.status(503).send("Something went wrong,please try later");
});

//default request handler
server.get("/",(req,res)=>{
    res.send("Welcome to Social Media Platform");
});

server.use("/api/users",userRouter);
server.use("/api/posts",jwtAuth,postRouter);
server.use("/api/comment",jwtAuth,commentRouter);
server.use("/api/likes",jwtAuth,likeRouter);
server.listen(port,()=>{
    console.log(`server is running at ${port}`);
});