const express=require('express')


const app=express()
//ya dono img ka show krwany ka leya ha
const bodyParser = require("body-parser")
const fileUploader= require("express-fileupload")
const cookieParse=require("cookie-parser")
// const dot =require("dotenv")

const path=require("path")


const errorMeddleware=require("./meddleware/error")
//config
//IF LOCAL CL RI HA TO YA WRNA HIROKOO APNA CONFIG VARIABLE HOTA HA KOD DADA GA HMAY
    if (process.env.NODE_ENV !== "PRODUCTION") {
        require("dotenv").config({path:'backend/config/config.env'});

      }

app.use(express.json())
app.use(cookieParse())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUploader())

//route
const product = require('./routes/productRoute')
const user=require("./routes/userRoute")
const order = require("./routes/orderRoute")
const payment = require("./routes/paymentRoute")
const report=require("./routes/reportRoute")
app.use('/api/v1',product);
app.use('/api/v1',user);
app.use('/api/v1',order);
app.use('/api/v1',payment);
app.use('/api/v1',report)

//for live our side
app.use(express.static(path.join(__dirname,"../frontend/build")));
// * is use for get all url,

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
})
//MEDDLEWARE FOR ERROR

app.use(errorMeddleware)


module.exports=app;