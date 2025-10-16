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
//filter caption
postRouter.get("/filter",(req,res)=>{
    PostController.filter(req,res);
})
//get all Drafts lists
postRouter.get("/drafts",(req,res)=>{
    PostController.getDrafts(req,res);
});
//publish a draft
postRouter.patch("/:id/publish",(req,res)=>{
    PostController.publishDraft(req,res);
});
// Archive post
postRouter.patch("/:id/archive",(req,res)=>{
    PostController.archive(req,res);
});
//all archeve posts
postRouter.get("/archived",(req,res)=>{
    PostController.getArchived(req,res);
});
// show post by specific id
postRouter.get("/:postid",(req,res)=>{
    PostController.show(req,res);
});
// update a specific post 
postRouter.patch("/:id/update",(req,res)=>{
    PostController.update(req,res);
});
//delete a specific post
postRouter.delete("/:id",(req,res)=>{
    PostController.delete(req,res);
});
//create a post to draft
postRouter.post("/drafts",(req,res)=>{
    PostController.createDraft(req,res);
});


export default postRouter;