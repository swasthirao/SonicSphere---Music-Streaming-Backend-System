const musicModel=require("../models/music.model");

const albumModel=require("../models/alb.model");

const { uploadFile }=require("../services/storage.service")

const jwt=require("jsonwebtoken");

async function createMusic(req,res){
//only those who have right(token) can create music,else no..


const { title }=req.body;

const file=req.file;

const result= await uploadFile(file.buffer.toString('base64'));
//now this res will be holding the exact formant ,like u gave the file name and ending extensions,no a template is returnd to result and exported to result over here..now just like user,u can create a music which has its on schema and properties..


console.log("RESULT URL:", result.url);


const music=await musicModel.create({
    uri:result.url,
    title,
    artist:req.user.id
})
//a new resource is been created..
res.status(201).json({
    message:"music created successfully",
    music:{
        id:music._id,
        uri:music.uri,
        title:music.title,
        artist:music.artist,
    }
})


}

async function createAlbum(req,res){

        const{title,musics}=req.body;

        const album=await albumModel.create({

            title,
            artist:req.user.id,
            musics:musics,

        })
//new resource created..

        res.status(201).json({
            message:"album created successfully",
            album:{
                id:album._id,
                title:album.title,
                artist:album.artist,
                musics:album.musics,

            }
        })


    }

// async function createAlbum(req, res) {

//     const { title } = req.body;

//     // Get all music uploaded by this artist
//     const musics = await musicModel.find({
//         artist: req.user.id
//     });

//     // Store their IDs in the album
//     const album = await albumModel.create({
//         title,
//         artist: req.user.id,
//         musics: musics.map(music => music._id)
//     });

//     res.status(201).json({
//         message: "album created successfully",
//         album: {
//             id: album._id,
//             title: album.title,
//             artist: album.artist,
//             musics: album.musics
//         }
//     });
// }

    async function getAll(req,res){
        const musics=await musicModel.find().skip(0).limit(2).populate("artist","username email");

        res.status(200).json({
            message:"musics fetched successfully",
            musics:musics,

        })
    }
    
    async function getAllbums(req,res){
        const albums=await albumModel.find().select("title artist").populate("artist","username email")

        res.status(200).json({
            message:"album of the artist fetched successfully",
            albums:albums
        })
    }

    async function getAlbumById(req,res){

       const albumId=req.params.albumId;

        const album=await albumModel.findById(albumId).populate("artist","username email")

        return res.status(200).json({
            message:"album fetched successfully",
            album:album,
        })

    }

    
    
module.exports={createMusic,createAlbum,getAll,getAllbums,getAlbumById};





