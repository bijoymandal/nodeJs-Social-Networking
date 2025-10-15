import { ApplicationError } from "../../../error-handler/applicationError.js";

export default class likeModel{
    constructor(id,postId,userId){
        this.id=Number(id);
        this.postId=Number(postId);
        this.userId=Number(userId);
    }
    static addLike(postId, userId) {
    try {
      // Prevent duplicate like by same user
      const alreadyLiked = Likes.find(
        (l) => l.postId === Number(postId) && l.userId === Number(userId)
      );
      if (alreadyLiked) {
        throw new ApplicationError("Post already liked by this user", 400);
      }

      const newLike = {
        id: Likes.length + 1,
        postId: Number(postId),
        userId: Number(userId),
        createdAt: new Date(),
        updateAt:new Date()
      };

      Likes.push(newLike);
      return newLike;
    } catch (error) {
      throw new ApplicationError(error.message, 500);
    }
  }
  static getLikesByPostId(postId)
  {
    return Likes.filter((l)=>l.postId === Number(postId));
  }
  static removeLike(postId,userId)
  {
    const index = Likes.findIndex((l)=>l.postId===Number(postId)&&l.userId===Number(userId));
    console.log("index",index);
    if(index === -1) throw new ApplicationError("Like Not Found",404);
    const removed = Likes[index]
    Likes.splice(index,1);
    return removed;
  }
  static toggleLike(postId,userId)
  {
    postId = Number(postId);
    userId= Number(userId);

    const existing = Likes.find((l)=>l.postId===postId && l.userId===userId);
    console.log("existing like",existing);
    // exists like remove to unline
    if(existing!==-1)
    {
      const removeLike = Likes.splice(existing,1)[0];
      return {liked:false,message:"like removed",data:removeLike};
    }
    //user not like yer add like
    
      const newLink = this.addLike(postId,userId);
      return {liked:true,message:"Post liked",data:newLink};
  }
  
}

let Likes = [
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
]