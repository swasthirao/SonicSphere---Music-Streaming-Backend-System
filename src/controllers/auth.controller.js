const userModel = require("../models/user.model");

console.log("USER MODEL:", userModel);

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');

async function registerUser(req,res){

    const{username,email,password, role="user"}=req.body;
 //so tht it shd be unique

 const isuserexists=await userModel.findOne({
    $or:[
        {username},
        {email}
    ]

 })

if(isuserexists){
    return res.status(409).json({
        message:"user with same credential exists"
    })
}

//hash the password
const hash=await bcrypt.hash(password,10)


//like ull get the user now after cecking if samecres exist  noe u actually create

const user=await userModel.create({
    username,
    password:hash,
    email,
    role
})
//now once the user is created jus create a token
console.log("JWT SECRET:", process.env.JWT_SECRET);

const token=jwt.sign({
id:user._id,
role:user.role
},process.env.JWT_SECRET);

res.cookie("token",token);

res.status(201).json({
    message:"user registered successfully",
    user:{
        id:user._id,
        password:user.password,
        email:user.email,
        role:user.role
    }
})
}

async function loginUser(req,res){

    const{username,email,password}=req.body;

    //to check if there's no user with same creds..

    const user=await userModel.findOne({
        $or: [
            {username},
            {email}
        ]
        
    })
        if(!user){
           return res.status(401).json({

         message:"invalid credentials"  
        
    })
}


console.log("BODY:", req.body);
console.log("USER:", user);
console.log("DB PASSWORD:", user.password);


const ispassvalid=await bcrypt.compare(password ,user.password)

if(!ispassvalid){
    return res.status(401).json({
        message:"invalid credentials"
    })
}

const token=jwt.sign({
    id:user._id,
    role:user.role
},process.env.JWT_SECRET)

res.cookie("token",token)

console.log("LOGIN SUCCESS - SENDING RESPONSE");



res.status(200).json({
    message:"user logged in successfully",
    user : {
        id:user._id,
        username:user.username,
        email:user.email,
        role:user.role,
    }
});


}

module.exports={ registerUser,loginUser }
