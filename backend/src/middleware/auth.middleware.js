const jwt= require("jsonwebtoken");

async function authArtist(req, res,next){

    console.log("Cookies:", req.cookies);
    const token= req.cookies.token;
     console.log("Token:", token);


    if(!token){
        return res.status(403).json({
            massage:"unautharized user"
        })
    }
    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET)
         console.log("Decoded:", decoded);
        if(decoded.role!="Artist"){
            return res.status(403).json({
                massage:"you dont have acces to create music and albums "
            })
        }
        req.user= decoded;
        next();

    }catch(err){
        console.log(err)
        return res.status(401).json({
            massage:"internel server error"
        })
    }
}

async function authUser(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            massage:"unautharized user"
        })
    }
    try{
     const decoded = jwt.verify(token,process.env.JWT_SECRET)
     if(decoded.role!="user" ){
        return res.status(403).json({
            massage:"only users can access"
        })
     }

     req.user= decoded;
     next();

    }catch(err){
        console.log(err)
        return res.status(401).json({
            massage:"unauthrazed user"
        })
    }
}


module.exports={ authArtist, authUser};