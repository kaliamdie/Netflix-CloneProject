const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userdb = require('../models/userSchema');




exports.signup = async (req, res) => {
    const {fname,lname,password,email}=req.body
    if(!fname|| !lname|| !password|| !email){
      res.status(422).json({error:"fill all the details"})
    }
    try{
  const preuser= await userdb.findOne({email:email})
  if(preuser){
      res.status(422).json({error:"email already exist"})
  
  }else{
    const finalUser = new userdb({
      fname,
      lname,
      email,
      password
  });
  
  
      const storeData=await finalUser.save()
      res.status(201).json({status:201,storeData});
      // console.log(storeData)
  
  }
    } catch (error) {
      console.error(error); // Log the actual error for debugging purposes
      res.status(500).json({ error: "Server error" }); // Send a generic error response to the client
    }
     };
     exports.login = async (req, res) => {
        const { password, email } = req.body;
      
        if (!password || !email) {
          return res.status(422).json({ error: "Fill in all the details" });
        }
      
        try {
          const userValid = await userdb.findOne({ email: email });
      
          if (!userValid) {
            return res.status(422).json({ error: "User not found" });
          }
      
          const isMatch = await bcrypt.compare(password, userValid.password);
      
          if (!isMatch) {
            return res.status(422).json({ error: "Incorrect password" });
          } else {
            const token = await userValid.generateAuthtoken();
            res.cookie("usercookie", token, {
              expires: new Date(Date.now() + 900000000),
              httpOnly: true,
            });
            const result = {
              userValid,
              token,
            };
            res.status(201).json({ status: 201, result });
          }
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Server error" });
        }
      }; // Close the exports.login function properly
      
      exports.validUser = async (req, res) => {
        try {
          const ValidUserOne = await userdb.findOne({ _id: req.userId });
          res.status(200).json({ ValidUserOne });
        } catch (error) {
          res.status(401).json({ error: "Server error" });
        }
      };