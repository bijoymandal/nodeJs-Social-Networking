import express from "express";
import LikeController from "../controllers/like.controller.js";
const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get("/:postId",(req,res)=>{
    likeController.show(req,res);
});
likeRouter.get("/toggle/:postId",(req,res)=>{
    likeController.toggleLike(req,res);
});
export default likeRouter;
