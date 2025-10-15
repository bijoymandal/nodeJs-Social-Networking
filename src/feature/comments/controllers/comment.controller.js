import commentModel from "../models/comment.models.js";

export default class CommentController{
    async create(req,res)
    {

        try{
            const {postId,content} = req.body;
            const userId = req.user.userID;
            console.log("req.body",postId,content,userId);
            const comment = commentModel.createComment(postId,userId,content);
            res.status(201).json({message:"Comment added", data:comment});
        }
        catch(error)
        {
            res.status(500).json({message:error.message});
        }
    }
    async getPostComment(req,res)
    {
        try{
            const postId= req.params.postId;
            if(!postId)
            {
                res.status(404).json("Post Not Found");
            }
            const comments = commentModel.getCommentsByPostId(postId);
            res.status(201).json({message:"Comment get successfully",data:comments});
        }
        catch(error)
        {
            res.status(404).json({message:error.message});
        }
    }
    async update(req,res)
    {
        try{
            const userId = req.user.userID;
            const {content}= req.body;
            const updateComment = commentModel.updateComment(req.params.id,userId,content);
            res.status(200).json({message:"comment updated",data:updateComment});
        }
        catch(error)
        {
            res.status(404).json({message:error.message});
        }
    }
    async delete(req,res)
    {
        try{
            const commentId = req.params.commentId;
            
            const deleted = commentModel.deleteComment(commentId,req.user.userID);
            res.status(200).json({message:"Comment deleted",data:deleted});
        }
        catch(error)
        {
            res.status(404).json({message:error.message});
        }
    }
}