const express=require("express");

const router=express.Router();

const {likeMusic,unlikeMusic,getLikeCount}=require("../controllers/like.controller");

const {authUser}=require("../middlewares/auth.middlewares");


//post
router.post("/:musicId",authUser,likeMusic);

router.delete("/:musicId",authUser,unlikeMusic);

router.get("/:musicId",authUser,getLikeCount);

module.exports=router;





