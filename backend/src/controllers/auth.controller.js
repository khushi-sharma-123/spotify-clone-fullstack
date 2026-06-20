const userModel= require("../models/user.model")

const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')

async function registerUser(req, res){
    const { username, email, password , role="user"}= req.body;

   const isUserAlreadyAxists= await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
   })
   if(isUserAlreadyAxists){
    return res.status(409).json({
        massage:"user already exists"
   })
   }

   const hash = await bcrypt.hash(password,10)
   const user= await userModel.create({
    username,
    email, 
    password:hash,
    role
   })

   const token = jwt.sign({
    id:user._id,
    role:user.role
   }, process.env.JWT_SECRET)

   res.cookie("token",token,{
     httpOnly: true, 
     secure:false, 
     sameSite:'lax', 
     maxAge:7*24*60*60*1000
   });

   res.status(201).json({
    massage:"user created successfuly",
    token,
    user:{
        id:user._id,
        username:user.username,
        email:user.email,
        // password:user.password,
        role:user.role,
        token
    }

   })
}

async function loginUser(req,res){
    const {username,email,password}=req.body;
    const user=await  userModel.findOne({
$or:[
    {username},
    {email}
]
    })
    if(!user){
        return res.status(401).json({
            massage:"Invalid Crendentials "
        })
    }
    const isPasswordValid= await bcrypt.compare(password, user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            massage :"invalid password "
        })
    }
    const token =jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
});
res.status(200).json({
    massage:"login successfully",
    id:user._id,
    username:user.username, 
    email:user.email,
    // password:user.password,
    role:user.role
    ,token
})
}

async function logoutUser(req, res ) {
    res.clearCookie("token")
    res.status(200).json({
        massage:"user logged out successfully"
    })
    
}


module.exports={registerUser,loginUser,logoutUser};