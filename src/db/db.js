const mongoose=require('mongoose');

async function conDB(){
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("connected to DB")
    }
    catch(err){
        console.log("some error occured",err);
    }
}

module.exports=conDB;

