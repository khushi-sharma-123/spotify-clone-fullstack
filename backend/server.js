require ('dotenv').config();
const { config } = require('dotenv')
const app = require("./src/app")
const connectDB= require("./src/db/db")



connectDB();



app.listen(3000,()=>{
    console.log("server runnig on port 3000")
    massage:"server runnig on port 3000"
})