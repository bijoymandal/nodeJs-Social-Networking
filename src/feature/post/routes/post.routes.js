import express from "express";
import postController from "../controllers/post.controller.js";

const postRouter = express.Router();
const PostController = new postController();
//all posts
postRouter.get("/all",(req,res)=>{
    PostController.index(req,res);
});
//user specific posts
postRouter.get("/",(req,res)=>{
    PostController.getPosts(req,res);
});
// Add a New Post
postRouter.post("/",(req,res)=>{
    PostController.addPost(req,res);
});
// show post by specific id
postRouter.get("/:postid",(req,res)=>{
    PostController.show(req,res);
});
// update a specific post 
postRouter.patch("/:id/update",(req,res)=>{
    PostController.update(req,res);
});
postRouter.delete("/:id",(req,res)=>{
    PostController.delete(req,res);
});

export default postRouter;