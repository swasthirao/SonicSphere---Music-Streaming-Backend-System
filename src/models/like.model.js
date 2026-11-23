const mongoose=require("mongoose");

const likeSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },

    music:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"music",
    required:true  
    }
});

//prevent sam eperson from liking twice..
likeSchema.index({user:1,music:1},{unique:true});

const likeModel=mongoose.model("like",likeSchema);

module.exports=likeModel;
