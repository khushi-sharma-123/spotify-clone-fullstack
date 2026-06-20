const imagekit= require("@imagekit/nodejs");


const imageKitClient= new imagekit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
});

async function uploadfile(file){
const result= await imageKitClient.files.upload({
file,
fileName:"music"+ Date.now(),
foldername:"spotify/music"
})
return result ;
}

module.exports= {uploadfile};


