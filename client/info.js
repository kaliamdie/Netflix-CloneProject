// const mongoose=require("mongoose")
// const validator=require("validator")
// const bcrypt=require("bcryptjs")
// const jwt=require("jsonwebtoken")
// const keysecret="ldsjjvbhkdfhbxmvcnkshckjhes"
// const Schema=mongoose.Schema
// const userSchema=new  Schema({
//     fname:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     lname:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     validator(value){
// if(!validator.isEmail(value)){
//     throw new Error("not valid email")
// }
// }
//     },
//     password:{
//         type:String,
//         required:true,
        
//     },
//     tokens:[
//         {
//             token:{
//                 type:String,
//                 required:true,

//             }
//         }
//     ]
// })
// //token generate
// userSchema.methods.generateAuthtoken=async function (){
//     try {
//         let token2 = jwt.sign({ _id: this._id,} ,keysecret , { expiresIn: "1d" });
//         this.tokens = this.tokens.concat({ token: token2 });
//         await this.save();
//         return token2; // Corrected the variable name here
//       } catch (error) {
//         // Handle the error
//   res.status(422).json(error)
//       }
      
   
// }
// userSchema.pre("save",async function (next){
//     if(this.isModified("password")){
//         this.password=await bcrypt.hash(this.password,12)
//     }
    
//     next()
// })
// const userdb=new mongoose.model("users",userSchema)
// module.exports=userdb


///userschema



// const express = require('express');
// const router=express.Router()
// const bcrypt=require("bcryptjs")
// const userdb = require('../models/userSchema');
// const authenticate=require("../middleware/authentication")
// router.post("/signup",async(req,res)=>{
//   const {fname,lname,password,email}=req.body
//   if(!fname|| !lname|| !password|| !email){
//     res.status(422).json({error:"fill all the details"})
//   }
//   try{
// const preuser= await userdb.findOne({email:email})
// if(preuser){
//     res.status(422).json({error:"email already exist"})
// }else{
//   const finalUser = new userdb({
//     fname,
//     lname,
//     email,
//     password
// });


//     const storeData=await finalUser.save()
//     res.status(201).json({status:201,storeData});
//     // console.log(storeData)

// }
//   } catch (error) {
//     console.error(error); // Log the actual error for debugging purposes
//     res.status(500).json({ error: "Server error" }); // Send a generic error response to the client
//   }
  
// })
//   //user login
//   router.post("/login", async (req, res) => {
//     const { password, email } = req.body;
  
//     if (!password || !email) {
//       return res.status(422).json({ error: "Fill in all the details" });
//     }
  
//     try {
//       const userValid = await userdb.findOne({ email: email });
  
  
//       if (!userValid) {
//         return res.status(422).json({ error: "User not found" });
//       }
    
//       const isMatch = await bcrypt.compare(password, userValid.password);
    
//       if (!isMatch) {
//         return res.status(422).json({ error: "Incorrect password" });
      
//       }else{
//         const token = await userValid.generateAuthtoken();
//         res.cookie("usercookie", token, {
//           expires: new Date(Date.now() + 900000000),
//           httpOnly: true
//         }); 
//         const result={
//           userValid,
//           token
//         }
//         res.status(201).json({status:201,result})
     
//         // console.log(token);
//       }
  
//       // Token generation
   
     
    
  
//       // res.json({ token }); // Send the token in the response
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Server error" });
//     }
//   });
//   //user vaild
//   router.get("/validuser",authenticate,async(req,res)=>{
// try {
//   const ValidUserOne=await userdb.findOne({_id:req.userId})
//   res.status(201).json({ValidUserOne }); 
// } catch (error) {
//   res.status(401).json({ error: "Server error" }); 
// }
//   })
  
// module.exports=router