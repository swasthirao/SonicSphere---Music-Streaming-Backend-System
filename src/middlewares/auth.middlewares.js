const jwt=require("jsonwebtoken");

async function authArtist(req,res,next){
     console.log("🔥 AUTH artist CALLED");
    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message : "unauthorized"
        })
    }

    try{

        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role !== "artist"){
            return res.status(403).json({
                message:"you have no access"
            })
        }
        //since decoed is not thee i controllers,middleware can modify the data coming in request . body..
        req.user=decoded;

        next()
    }
    catch(err){
        console.log(err);
        return res.status(401).json({
            message:"unauthorised"
        })
    }
}

async function authUser(req,res,next){
     console.log("🔥 AUTH USER CALLED");
   const token= req.cookies.token;

   if(!token){
    return res.status(401).json({
         message:"unauthorized "
    })
 
   }

   try{
   const decoded=jwt.verify(token,process.env.JWT_SECRET)
    
   if(decoded.role !== "user"){

    return res.status(403).json({
        message:"forbidden.!!only user allowed"
    })
   }

   req.user=decoded;//decoded mainly consists
   next()
}
catch(err){

    console.log(err);
        return res.status(401).json({
            message:"unauthorised"
        })

}
}

module.exports={ authArtist,authUser }



