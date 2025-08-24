const mongoose=require("mongoose");

const ideaSchema=new mongoose.Schema({
    idea_name : {
        type : String
    },
    author_name : {
        type : String
    },
    idea_description : {
        type : String
    }

})

module.exports=mongoose.model("Idea",ideaSchema);