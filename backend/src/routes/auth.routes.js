const express= require('express');
const controllers= require("../controllers/auth.controller")

const router= express.Router();

router.post("/register",controllers.registerUser )

router.post("/login",controllers.loginUser)

router.post("/logout", controllers.logoutUser)


module.exports= router;