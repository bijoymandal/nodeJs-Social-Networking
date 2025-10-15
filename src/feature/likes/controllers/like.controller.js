import likeModel from "../../post/models/like.model.js";

export default class LikeController{
    async show(req,res){
        try{
            const postId = req.params.postId;
            const result = likeModel.getLikesByPostId(postId);
            res.status(200).json({data:result}); 
        }
        catch(error)
        {
            res.status(500).json({message:error.message});
        }
    }
    async toggleLike(req,res)
    {
        try {
      const postId = req.params.postId;
      const userId = req.user.userID;
      const result = likeModel.toggleLike(postId, userId);
      res.status(200).json(result);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
    }
    
}