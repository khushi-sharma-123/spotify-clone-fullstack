const mongoose= require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log("database connected succesfullly")

    }catch(error){
        console.error("connection failed: ",error);
        process.exit(1);

    }
}
module.exports= connectDB;