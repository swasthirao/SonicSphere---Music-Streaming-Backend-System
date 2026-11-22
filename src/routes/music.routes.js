const express=require('express');

const multer=require('multer');
const musicController=require("../controllers/music.controller");

const authMiddleware=require("../middlewares/auth.middlewares")

const router=express.Router();

const upload=multer({ storage:multer.memoryStorage() })

//single means it takes a single value at once and multer is amiddleware..(stores in ram bef reaching imagekit
router.post("/upload",upload.single("music"),authMiddleware.authArtist,musicController.createMusic)

router.post("/album",authMiddleware.authArtist,musicController.createAlbum)

//router.get("/",authMiddleware.authUser,musicController.getAll)


// router.get("/", (req, res) => {
//     console.log("🔥🔥 GET MUSIC ROUTE");
//     res.json({
//         message: "GET route reached"
//     });
// });

router.get(
    "/",
    authMiddleware.authUser,
    musicController.getAll
);
router.get("/albums",authMiddleware.authUser,musicController.getAllbums);
router.get("/albums/:albumId",authMiddleware.authUser,musicController.getAlbumById)
module.exports=router;





