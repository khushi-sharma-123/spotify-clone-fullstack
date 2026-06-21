const musicModel = require("../models/music.model");
const albumMusic= require("../models/album.models");
const albumModel= require("../models/album.models")
const { uploadfile } = require("../services/storage.service");

const jwt = require("jsonwebtoken");
// const albumModel = require("../models/album.models");


async function CreateMusic(req, res) {
             console.log("body :", req.body);
             console.log("file:", req.file);
        const { title,albumId } = req.body;
        const file = req.file;
        if (!req.file) {
            return res.status(400).json({
                message: "Music file is required"
            });
        }
        const result = await uploadfile(file.buffer.toString('base64'))

        const music = await musicModel.create({
            uri: result.url,
            title,
            Artist: req.user.id,
        })
              // ADD SONG TO ALBUM
   const updateAlbum=  await albumModel.findByIdAndUpdate(
        albumId,
        {
            $push: {
                musics: music._id
            }
        }
    );
     console.log(updateAlbum);
        // return res.status(201).json({
        //     massage: "artist created music successfully ",
        //     // id: music._id,
        //     // uri: music.uri,
        //     // title: music.title,
        //     // Artist: music.Artist,
        //     music

        // });
   

    return res.status(201).json({
        message: "Music created successfully",
        music
    });
}

async function createAlbum(req, res){
   
   
            const {title , musicIds}= req.body

            const album = await albumMusic.create({
                title, 
                Artist:req.user.id, 
                musics:musicIds
            })
            return res.status(201).json({
                massage:"album created succesfully ",
                album:{
                    id:album._id,
                    title:album.title,
                    Artist:album.Artist,
                    musics:album.musics

                }
            })

        

    
}

async function getAllMusics(req, res){
    const musics= await musicModel
    .find()
    .limit(3)
    .populate
    ("Artist","username email")
        return res.status(200).json({
            massage:"musics fetched successfully",
            musics:musics
        })
    
}

async function getAllAlbums(req, res ){
    // const albums= await musicModel.find().select("title Artist").populate("Artist","username email")
    
    const albums= await albumModel.find().populate("Artist","username email")
    

     return res.status(200).json({
            massage:"albums fetched successfully",
            albums:albums
        })
}

async function getMyAlbum(req, res) {
    // console.log("Inside getMyAlbum");
    // console.log("User:", req.user);

    try{
        const albums= await albumMusic.find({
            Artist:req.user.id
        }).populate("Artist","username email");
//   console.log("Albums found:", albums);

        return res.status(200).json({
          massage: "Album fetched successfully",
          albums
        })
    }catch(err){
        //   console.log("ERROR:", err);
        return res.status(500).json({
            massage:err.massage
        });
    }
    
}
async function  getAllAlbumsIds(req,res){

    const albumIds= req.params.albumIds
    console.log(req.params.albumIds);
    const allAlbums = await albumModel.find();
console.log(allAlbums);
    const albums= await albumModel.findById(albumIds).populate("musics").populate("Artist", "username email");
    console.log(albums)
    console.log(albums.musics);
    return res.status(200).json({
        massage:"album fetched successfully",
       
        albums:albums
      
    })
}

async function getAlbumbyId(req, res) {
    try{
        const {albumId}= req.params;
        const album = await albumModel
        .findById(albumId)
        .populate("Artist", "username")
        .populate("musics");

        if(!album){
            return res.status(404).json({
                massage:"Album nt found"
            })
        };
        return res.status(200).json({
            massage:"album fetched successfully",
            album
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            massage:err.massage
        });
    }
}

module.exports = { 
    CreateMusic ,
     createAlbum,
     getAllMusics, 
      getAllAlbums,
       getMyAlbum,
        getAllAlbumsIds,
        getAlbumbyId
    };