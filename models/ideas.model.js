const mongoose=require("mongoose");

const ideaSchema=new mongoose.Schema({
    idea_name : {
        type : String,
        required : true
    },
    author_name : {
        type : String,
        required : true
    },
    idea_description : {
        type : String,
        required : true
    }

})

module.exports=mongoose.model("Idea",ideaSchema);