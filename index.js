// Server file - This is the starting point of the application
const express=require("express");
const app=express();
app.use(express.json());
require("dotenv").config();
const connectDB= require("./configs/db");
const {connectRedis} = require("./configs/redis");
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//bringing morgan into use
const morgan=require("morgan");
app.use(morgan("dev"));

//db connections
connectDB();
connectRedis();

//-------Stiched App with the route------------
const idea_route=require("./routers/ideas.routes");
app.use("/idea_app/v1",idea_route);

const signup_route = require("./routers/auth.routes");
app.use("/idea_app/v1",signup_route);


const PORT = process.env.PORT || 9596 ;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})
