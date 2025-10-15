import { ApplicationError } from "../../../error-handler/applicationError.js";

export default class commentModel{
    constructor(id,postId,userId,content){
        this.id=Number(id);
        this.postId=Number(postId);
        this.userId=Number(userId);
        this.content=String(content);
    }
    static createComment(postId,userId,content){
        console.log("create Comment");
        try{
            const newComment = {
                id:Comments.length+1,
                postId:Number(postId),
                userId:Number(userId),
                content:String(content),
                createdAt:new Date(),
                updatedAt:new Date()
            }
            Comments.push(newComment);
            return newComment;
        }
        catch(error)
        {
            throw new ApplicationError("Error creating comment",500);
        }
    }
    //all comment specific post
    static getCommentsByPostId(postId)
    {
        try{
            return Comments.filter(i=>i.postId===Number(postId));
        }
        catch(error)
        {
            throw new ApplicationError("Error fetching post",500);
        }
    }
    static updateComment(commentId,userId,content)
    {
        try{
            const comment = Comments.find((l)=>l.id===Number(commentId)&& l.userId===Number(userId));
            if(!comment) throw new ApplicationError("Comment not found to authorized",404);
            comment.content=content;
            comment.updatedAt = new Date();
            return comment; 
        }
        catch(error)
        {
            throw new ApplicationError(error.message,500);
        }
    }
    static deleteComment(commentId,userId)
    {
        try{
            const index = Comments.findIndex((c)=>c.id===Number(commentId)&& c.userId===Number(userId));
            if(index ==-1) throw new ApplicationError("Comment not found or authorized",400);
            const deleteComment = Comments[index];
            Comments.splice(index,1);
            return deleteComment;
        }
        catch(error)
        {
            throw new ApplicationError(error.message,500);
        }
    }
}

let Comments = [
    {
        id:1,
        postId:1,
        userId:2,
        content:"this is fist comment for post 1, I lobe coding Ninjas"
    },
    {
        id:2,
        postId:2,
        userId:1,
        content:"post of posing ninjas",
    }
    ,{
        id:3,
        postId:3,
        userId:2,
        content:"police sttic is ASDERTy"
    }
];