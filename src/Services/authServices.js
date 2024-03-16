const User = require("../Models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const registerUser= async(userData)=>{
 try{
    const existingUser = await User.findOne({email : userData.email})
    if(existingUser){
        throw new error("User Already exists");
    }

    const user = new User(userData)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password , salt)
    user.password = hashedPassword
    await user.save()
 }
 catch(err){
    throw err
 }
}
//in login - check find the email presence 
//find the email using findOne 
  //if email is absent throw the error - "user not found"
// compare the password using the comparePassword from the model
//if true , create the token using jwt.sign and envVariable
const loginUser = async(userData)=>{

    try{
        const {email , password} = userData
        const user = await User.findOne({email})
        if(!user){
            throw new error("user not found")
        }
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            throw new error("Invalid Credential")
        }
        const token = await jwt.sign({id:user._id} , process.env.JWT_SECRET)
        return {token , user}
    }
    catch(err){
        throw err
    }
}
module.exports = {registerUser , loginUser}