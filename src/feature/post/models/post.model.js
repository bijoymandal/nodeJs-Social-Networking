import { ApplicationError } from "../../../error-handler/applicationError.js";

export default class postModel{
    constructor(id,userId,caption,imageUrl)
    {
        this.id=Number(id);
        this.userId=Number(userId);
        this.caption=String(caption);
    }
    static addPost(userID,caption,imageUrl){
        const newPost = {
            id:Posts.length+1,
            userID:Number(userID),
            caption,
            imageUrl,
        };
        Posts.push(newPost);
        return newPost;
    }
    static getAllPost()
    {
        return Posts;
    }
    static getPostById(id)
    {
        const postId = Posts.find(u=>u.id == id);
        return postId || null;
    }
    static getUserPosts(userID)
    {
      try{
        const userPosts = Posts.filter(p=>p.userId==userID);
        return userPosts || null;
      }
      catch(error)
      {
        throw new ApplicationError("Somethinf Went Wrong",500);
      }
    }
    static updatePost(postId,userID,updateData)
    {
      try{
        const index = Posts.findIndex((p)=>p.id===Number(postId) && p.userId ===Number(userID));
        console.log(index);
        if(index === -1)
        {
          throw new ApplicationError("post Not Found",404);
        }
        Posts[index] = {...Posts[index],...updateData};
        return Posts[index];
      }
      catch(error)
      {
        throw new ApplicationError(error.message,500);
      }
    }
    static likePost(postId,userId)
    {
      const post = this.getPostById(postId);
      if(!post) return null;
      if(!post.likes.includes(userId)){
        post.likes.push(userId);
      }
      return post;
    }
    static unlikePost(postId,userId)
    {
      const post = this.getPostById(postId);
      if(!post) return null;
      post.likes = post.likes.filter(id=>id!==userId);
      return post;
    }
    static addComment(postId,userId,text)
    {
      const post = this.getPostById(postId);
      if(!post) return null;
      const newComment = {
        id:post.comments.length+1,
        userId,
        text,
        createdAt:new Date(),
      };
      post.comments.push(newComment);
      return newComment;
    }
    static deletePost(postId,userId){
      
        const index = Posts.findIndex((p)=>p.id===Number(postId.id)&& p.userId === Number(userId));
        console.log("index ",index);
        if(index === -1)
        {
          return false;
        }
        Posts.splice(index,1);
        return Posts;
    }
    static filterByPostCaption(keyword){
      try{
        if(!keyword || keyword.trim()==="")
        {
          return Posts.filter((p)=>p.status==="published");
        }
        
        const search = keyword.trim().toLowerCase();
        const matched = Posts.filter((p)=>p.status==="published" && p.caption.toLowerCase().includes(search));
        return matched;
      }
      catch(error){
        throw new ApplicationError("Error filtering post",500);
      }
    }
}

let Posts = [
  {
    id: 1,
    userId: 2,
    caption: "Morning coffee vibes ☕",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800",
    status:"published",
    
  },
  {
    id: 2,
    userId: 1,
    caption: "Exploring the city lights 🌆",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
    status:"published"
  },
  {
    id: 3,
    userId: 2,
    caption: "Nature’s calm 🌿",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
    status:"draft"
  },
  {
    id: 4,
    userId: 1,
    caption: "Working late nights 💻",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    status:"archived"
  },
];

