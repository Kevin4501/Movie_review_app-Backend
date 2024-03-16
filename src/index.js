require('dotenv').config({path:"src/.env"});
const express = require("express")
const mongoose =  require("mongoose")
const app = express()
const cors = require("cors")
const authRouters = require("../src/Routers/Auth.router")
const moviesRouter = require("../src/Routers/Movies.router")
app.use(cors())
app.use(express.json())
app.use("/api/users", authRouters )
app.use("/api/movies" , moviesRouter )
const PORT = process.env.PORT ;
//conect to mongoDB
mongoose
.connect(process.env.MONGODB_URI)
.then(()=>console.log("DB CONNECTED"))
.catch((err)=>console.log("Couldn't connect to the DB" , err))

app.get("/", (res,req)=>{
    console.log("Backend is running")
})

app.listen(PORT,()=>{
    console.log(`Server is running in PORT ${PORT}`)
})