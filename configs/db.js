const mongoose = require("mongoose");

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connection successfull...");
    }catch(err){
        console.log("Connection failed..!",err.message);
    }
}

module.exports = dbConnect ; 
