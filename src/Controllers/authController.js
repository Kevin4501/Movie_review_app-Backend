const authService = require("../Services/authServices")

const register = async (req,res)=>{
    try{
        //get the userData
        const userData = req.body
        //sending the request model to the Service layer
        const user = await authService.registerUser(userData)
        res.status(201).json({
            message : "User Registerd Successfully" , 
            //userId : user ,
        })
    }
    catch(err){
        res.status(500).json({"err":err.message})
    }
}
//login must send a token 
//token is created in service layer using environment variables

const login = async(req , res)=>{
    try{
        const userData = req.body;
        const{token , userId} = await authService.loginUser(userData)
        console.log(token)
        res.status(201).json({
            message : "User logged in successfully",
            token,
            userId
        })
    }
    catch(err){
        res.status(500).json({"err":err.message})
    }
}

module.exports = {register , login}