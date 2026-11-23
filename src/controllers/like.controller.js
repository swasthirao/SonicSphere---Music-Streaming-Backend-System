const likeModel=require("../models/like.model");

const musicModel=require("../models/music.model");

async function likeMusic(req,res){

    try{
        const userId=req.user.id;
        const musicId=req.params.musicId;

        const music=await musicModel.findById(musicId);

        if(!music){
            return res.status(404).json({
                message:"music not found"
        });
        
        }

    const existingLike=await likeModel.findOne({
        user:userId,
        music:musicId
    });

    if (existingLike) {
        return res.status(409).json({
            message: "You have already liked this song"
        });
    }

    await likeModel.create({
        user:userId,
        music:musicId
    });

    return res.status(201).json({
        message:"song liked successfully"
    });
}
catch(error)
{
 return res.status(500).json({
    message:"error while liking the song",
    error:error.message
 });
}

}

//deleting the like

async function unlikeMusic(req,res){
    try{

        const userId=req.user.id;
        const musicId=req.params.musicId;

        const deletedLike=await likeModel.findOneAndDelete({
            user:userId,
            music:musicId
        });

        if(!deletedLike){
            return res.status(404).json({
                message:"you have not liked this song"
            });
        }

        return res.status(200).json({
            message:"song unliked successfully"
        });
    }
    catch(error)
    {
        return res.status(500).json({
        message:"There was error while unliking the song",
        error:error.message
        });
    }


}

async function getLikeCount(req,res){
    try{

    const userId=req.user.id;
    const musicId=req.params.musicId;

    const music=await musicModel.findById(musicId);

    if(!music){
        return res.send(404).json({
            message:"music not found"
        });
    }
//count all likes for the current songs..
    const totalLikes=await likeModel.countDocuments({
       music:musicId 
    });

    const isLiked=await likeModel.exists({
       user:userId,
       music:musicId
       
    });

    //!! will tell true or false

    return res.status(200).json({
        musicId,
        totalLikes,
        isLiked: !!isLiked

    });

  }
  catch(error){
    return res.status(500).json({
        message:"Error while fetching likes",
        error:error.message
    });
    
  }

}

module.exports={likeMusic,unlikeMusic,getLikeCount};
