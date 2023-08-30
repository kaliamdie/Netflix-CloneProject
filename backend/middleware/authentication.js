const jwt=require("jsonwebtoken")
const userdb=require("../models/userSchema")
const keysecret="ldsjjvbhkdfhbxmvcnkshckjhes"

const authenticate=async(req,res,next)=>{
try{
    const token=req.headers.authorization
const verifyToken=jwt.verify(token,keysecret)
const rootUser=await userdb.findOne({_id:verifyToken._id})
if(!rootUser){
    throw new Error("user not fouund.")
}
req.token=token
req.rootUser=rootUser
req.userId=rootUser._id
next()
}catch(error){
res.status(401).json({status:401,message:"unauthorized no token provided."})
}
}





module.exports=authenticate