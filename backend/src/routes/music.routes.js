const express= require('express')

const musicController= require("../controllers/music.controller");

const authmiddleware= require("../middleware/auth.middleware");

const multer= require('multer')

const upload = multer({
    storage:multer.memoryStorage()
})


const router= express.Router();


router.post("/create-music",authmiddleware.authArtist,upload.single("music") ,musicController.CreateMusic)

router.post("/album",authmiddleware.authArtist, musicController.createAlbum)

router.get("/", authmiddleware.authUser,musicController.getAllMusics);

router.get("/albums", authmiddleware.authUser, musicController.getAllAlbums);

router.get("/albums/:albumIds", authmiddleware.auth, musicController.getAllAlbumsIds);

router.get("/my-albums", authmiddleware.authArtist,musicController.getMyAlbum)
router.get("/album/:albumId" , authmiddleware.authArtist,musicController.getAlbumbyId)
module.exports= router