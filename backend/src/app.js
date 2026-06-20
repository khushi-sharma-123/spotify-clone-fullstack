const express = require('express')
const cors = require("cors");
const cookieparser= require('cookie-parser');
const authRoutes= require("./routes/auth.routes")
const musicRoutes= require("./routes/music.routes")


// const mongoose= require('mongoose');


const app= express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieparser());
app.use("/api/auth",authRoutes);
app.use("/api/music",musicRoutes);

module.exports= app;