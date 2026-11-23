console.log("APP.JS LOADED");

const express=require('express');
const cookieParser=require('cookie-parser');

const app=express();//instance
const authRoutes=require('./routes/auth.routes');
const musicRoutes=require('./routes/music.routes');
const likeRoutes=require('./routes/like.routes');
//authroutes will be deined ,also with api in it..so in app.js jus use it with prefix.

//middleware
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
app.use('/api/music',musicRoutes);
app.use('/api/likes',likeRoutes);

module.exports=app;

