//require('dotenv').config({path:'./env'})
import express from "express";
import dotenv from "dotenv"
import connectDb from "./db/db.index.js";



dotenv.config({path:"./.env"})
const app = express();
connectDb()
.then(()=>{

app.listen(process.env.PORT || 8000,()=>{
  console.log(`server is running at port ${process.env.PORT}`)
})
}
).catch((err)=>{
console.log("Mongo db connection failed !");

})















