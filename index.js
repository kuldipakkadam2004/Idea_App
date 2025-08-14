//5

/**
 * Server file - This is the starting point of the application
 */

const express=require("express");
const app=express();
const PORT=9595;

app.use(express.json());


//bringing morgan into use
const morgan=require("morgan");
app.use(morgan("dev"));

//-------Stiched App with the route------------
const idea_route=require("./routers/ideas.routes");
app.use("/idea_app/v1",idea_route);
//----------------------------------------------




app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})

