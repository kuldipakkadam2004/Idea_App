//5
// Server file - This is the starting point of the application
 

const express=require("express");
const app=express();
const PORT=9595;
app.use(express.json());
const mongoose= require("mongoose");
require("dotenv").config();

//bringing morgan into use
const morgan=require("morgan");
app.use(morgan("dev"));

//-------Stiched App with the route------------
const idea_route=require("./routers/ideas.routes");
app.use("/idea_app/v1",idea_route);


(async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Succesfully connected to database...!")
    }catch(err){
        console.log("MongoDB error", err.message);
    }
})();

//----------------------------------------------

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

