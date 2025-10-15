import express from "express";
import CommentController from "../controllers/comment.controller.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post("/",(req,res)=>{
    commentController.create(req,res);
});

commentRouter.get("/:postId",(req,res)=>{
    commentController.getPostComment(req,res);
});
commentRouter.put("/:id",(req,res)=>{
    
    commentController.update(req,res);
});
commentRouter.delete("/:commentId",(req,res)=>{
    commentController.delete(req,res);
})
export default commentRouter;

