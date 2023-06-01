const app=require('./app')

const cloudinary=require("cloudinary")
const DBconnect = require('./config/database')
// const dot =require("dotenv")
// HANDLE UNCAUGTH EXCEPTION

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to HANDLE UNCAUGTH EXCEPTION`);
    process.exit(1)

})



//config 
//IF LOCAL CL RI HA TO YA WRNA HIROKOO APNA CONFIG VARIABLE HOTA HA KOD DADA GA HMAY
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({path:'backend/config/config.env'});


  }



//Connect DATABASE
DBconnect()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const server=app.listen(process.env.PORT,()=>{

    console.log(`Server is Running on http://localhost:${process.env.PORT}`);
});

//UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to UNHANDLED PROMISE REJECTION`);
//jb bhi error ay server bnd kr do,...
    server.close(()=>{
        process.exit(1)
    })
});



