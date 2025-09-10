const mongoose=require("mongoose");

const ideaSchema=new mongoose.Schema({
    idea_name : {
        type : String,
        require : true
    },
    author_name : {
        type : String,
        require : true
    },
    idea_description : {
        type : String,
        require : true
    }

})

module.exports=mongoose.model("Idea",ideaSchema);