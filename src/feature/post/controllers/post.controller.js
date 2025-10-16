import postModel from "../models/post.model.js";

export default class postController{

    async index(req,res){
        try{
            const {sortBy,page,limit,caption} = req.query;
            const posts = postModel.getAllPost({sortBy,page,limit,caption});
            res.status(200).json({posts:posts});
        }
        catch(error)
        {
            res.status(500).json({message:"No posts found"});
        }
    }
    async getPosts(req,res){
        
        try{
            
            const allPosts = await postModel.getUserPosts(req.user.userID);
            res.status(201).json({message:"User all Posts Fetch successfully",posts:allPosts});
        }
        catch(error)
        {
            res.status(500).json({message:"No Any Posts",error:error});
        }
    }
    async addPost(req,res){
        try{
            const {caption,imageUrl} = req.body;
            const addpost = await postModel.addPost(req.user.userID,caption,imageUrl);
            res.status(201).json({message:"Add New Post",data:addpost});
        }   
        catch(error)
        {   
            res.status(401).json({message:"Something wwnt error",error:error});
        }
    }
    async show(req,res)
    {
        try{
            const post = await postModel.getPostById(req.params.postid);
            res.status(200).json({message:"post data fetch",posts:post});
        }
        catch(error)
        {
            res.status(401).json({message:"Unauthenticated"});
        }
    }
    async update(req,res){
        try{
            const userId = req.user.userID;
            const postId = req.params.id;
            let {caption,imageUrl}= req.body;
            if((caption===undefined ||caption==="")&& (imageUrl===undefined||imageUrl===""))
            {
                res.status(400).json({message:"No filed to update"});
            }
            const Posts = postModel.getPostById(postId);
            console.log(Posts);
            if(!Posts)
            {
                return res.status(404).json({message:"Post Not Found"});
            }
            if(Posts.userId !==Number(userId))
            {
                return res.status(403).json({message:"Unauthorized: cannot update another user's post"});
            }

//             const existsPost = userPosts.find(p=>p.id===Number(postId));
//             console.log("post id userpost",userPosts);
//             console.log("post id exists",existsPost);
//             if(!existsPost)
//             {
//                 res.status(400).json({message:"Post Not Found"});
//             }
//             //keep old not provided value 
            caption = caption || Posts.caption;
            imageUrl = imageUrl || Posts.imageUrl;
            const updatePost = postModel.updatePost(postId,userId,{caption,imageUrl});
            res.status(200).json({message:"post updated",data:updatePost});
        }
        catch(error)
        {
            res.status(401).json({message:"Plase check query",error:error.message});
        }
    }
    async like(req,res)
    {
        const userId = req.user.userID;
        const post = postModel.likePost(req.params.id,userId);
        if(!post) return res.status(404).json({message:"post Not found"});
        res.status(200).json({message:"post liked",data:post});
    }
    async unlike(req,res)
    {
        const userId = req.user.userID;
        const post = postModel.unlikePost(req.params.id,userId);
        if(!post) return res.status(404).json({message:"Post not found"});
        res.status(200).json({message:"Like removed",data:post});
    }
    async comment(req,res){
        const userId = req.user.userID;
        const {text} = req.body;
        if(!text) return res.status(400).json({message:"Comment text required"});
        const comment = postModel.addComment(req.params.id,userId,text);
        if(!comment) return res.status(404).json({message:"Post not found"});
        res.status(201).json({message:"comment added",data:comment});
    }
    async delete(req,res){
        try{
            const userId = req.user.userID;
            // const post = postModel.deletePost(req.params.id);
            const post = postModel.getPostById(req.params.id);
            if(!post)
            {
                return res.status(404).json({message:"Post Not Found"});
            }
            if(post.userId !==Number(userId))
            {
                return res.status(403).json({message:"Unauthorized: cannot update another user's post"});
            }
            const allPost = postModel.deletePost(post,userId);
            

            res.status(200).json({message:"Post deleted",posts:allPost});
        }
        catch(error)
        {
            res.status(404).json({message:"Unauthorized users",error:error.message});
        }
    }
    async filter(req,res){
        
        try{
            const {caption} = req.query;
            const filtered = postModel.filterByPostCaption(caption);
            res.status(200).json({total:filtered.length,data:filtered});
        }
        catch(error)
        {
            res.status(404).json({message:error.message});
        }
    }
    async createDraft(req, res) {
    try {
      const { caption, imageUrl } = req.body;
      const userId = req.user.userID;
      const post = postModel.addPost(userId, caption, imageUrl, true);
      res.status(201).json({ message: "Draft created", data: post });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async publishDraft(req, res) {
    try {
      const userId = req.user.userID;
      const postId = req.params.id;
      const updated = postModel.publishPost(postId, userId);
      res.status(200).json({ message: "Post published", data: updated });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async archive(req, res) {
    try {
      const userId = req.user.userID;
      const postId = req.params.id;
      const archived = postModel.archivedPost(postId, userId);
      res.status(200).json({ message: "Post archived", data: archived });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getDrafts(req, res) {
    try {
      const userId = req.user.userID;
      const drafts = postModel.getDrafts(userId);
      console.log(drafts);
      res.status(200).json({ total: drafts.length, data: drafts });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getArchived(req, res) {
    try {
      const userId = req.user.userID;
      const archived = postModel.getArchived(userId);
      res.status(200).json({ total: archived.length, data: archived });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async bookMarkToggle(req,res)
  {
    try{
    const post = postModel.toggleBookMark(req.params.postId,req.user.userID);
    console.log('return post',post);
    if(!post) res.status(404).json({message:"Post Not Found"});
    res.json({message:"bookMark Toggled",post});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
  }
}