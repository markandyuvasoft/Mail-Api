import  express  from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors";
import bodyParser from "body-parser";
// import morgan from 'morgan'
import router from "./routes/route.js"

dotenv.config()

const app=express();

// midleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))


//frontend problem
app.use(cors())

// routes
app.use("/",router)
 

const PORT=process.env.PORT||3000
// connect mongo db atlas
mongoose.connect(process.env.MONGO_URL,{usenewurlparser:true,}).then(()=>{
    console.log("connected to mongodb atlas")
}).catch(error=>{
console.log("something wrong")
})

// server port
app.listen(PORT,()=>{
    console.log("server started at port http://localhost:3000");
})