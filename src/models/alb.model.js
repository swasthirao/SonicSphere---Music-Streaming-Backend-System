const mongoose=require("mongoose");

const albSchema=new mongoose.Schema({
    title:{

        type:String,
        required:true,

    },
    musics: [{
        //referring to another mongoDB identiy
        type:mongoose.Schema.Types.ObjectId,
        ref:"music"
    }],

    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:"true"
    }
})

const albumModel=mongoose.model("album",albSchema)

module.exports=albumModel;
