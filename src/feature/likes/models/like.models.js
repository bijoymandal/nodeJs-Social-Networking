import { ApplicationError } from "../../../error-handler/applicationError.js";

export default class likeModel{
    constructor(id,postId,userId){
        this.id=Number(id);
        this.postId=Number(postId);
        this.userId=Number(userId);
    }
    static addLike(postId,userId)
    {
        const existing = Likes.find((l)=>l.postId === Number(postId) && l.userId ===Number(userId));
        if(existing) throw new ApplicationError("Post Already linked",400);
        const newLike = {
            id:Likes.length+1,
            postId:Number(postId),
            userId:Number(userId),
            createdAt:new Date(),
        };
        Likes.push(newLike);
        return newLike;
    }
    static removeLike(postId,userId){
        const Index = Likes.findIndex((l)=>l.postId === Number(postId) && l.userId === Number(userId));
        if(Index === -1) throw new ApplicationError("Like Not found",404);
        const removed = Likes[Index];
        Likes.splice(Index,1)
        return removed;  
    }
    // get all likes for a post
    static getLikeByPostId(postId)
    {
        return Likes.filter(l=>l.postId===Number(postId));
    }
    //Toggle like (add if not liked, remove if liked)
    static toggleLike(postId,userId){
        const existing = Likes.find((l)=>l.postId===Number(postId)&&l.userId===Number(userId));
        if(existing)
        {
            this.removeLike(postId,userId);
            return {Likes:false}
        }
        else
        {
            this.addLike(postId,userId)
            return {liked:false};
        }
    }

}

let Likes=[
    {
        id:1,
        postId:1,
        userId:2
    },
    {
        id:2,
        postId:2,
        userId:1,
    },
    {
        id:3,
        postId:3,
        userId:2
    },
    {
        id:4,
        postId:4,
        userId:1
    }
];