const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const keysecret="ldsjjvbhkdfhbxmvcnkshckjhes"
const Schema=mongoose.Schema
const userSchema=new  Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    validator(value){
if(!validator.isEmail(value)){
    throw new Error("not valid email")
}
}
    },
    password:{
        type:String,
        required:true,
        
    },
    tokens:[
        {
            token:{
                type:String,
                required:true,

            }
        }
    ]
})
//token generate
userSchema.methods.generateAuthtoken=async function (){
    try {
        let token2 = jwt.sign({ _id: this._id,} ,keysecret , { expiresIn: "1d" });
        this.tokens = this.tokens.concat({ token: token2 });
        await this.save();
        return token2; // Corrected the variable name here
      } catch (error) {
        // Handle the error
  res.status(422).json(error)
      }
      
   
}
userSchema.pre("save",async function (next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12)
    }
    
    next()
})
const userdb=new mongoose.model("users",userSchema)
module.exports=userdb
