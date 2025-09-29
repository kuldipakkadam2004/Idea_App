//Controller Layer: has functions to interact with that data.

const Idea=require("../models/ideas.model");

(async () =>{
    let documentCount = await Idea.countDocuments({})
})();

//controller to fetch all the ideas present in the system
exports.getAllIdeas = async (req,res)=>{
    try{
        const allIdeas= await Idea.find(); 

        if(allIdeas.length > 0){
            return res.status(200).send({
                message : "All Ideas fetched successfully",
                Ideas : allIdeas,

            }); 
        }
        else{
            return res.status(404).send({
                message : "No ideas found",
                Ideas : []  
            });
        }

    }catch(err){
        return res.status(500).send({
            message : err.message
        })
    }
}


 
// controller to get a idea based on id
exports.getIdeaBasedOnId= async (req,res)=>{
    try{
        const id = req.params.id;
        const idea = await Idea.findById(id);

        if(idea){
            return res.status(200).send({
                idea : idea
            });
        }
        else{
            return res.status(404).send({
                message : `Idea with id :  ${id} not found`
            })
        }
    }catch(err){
        return res.status(500).send({
            message : err.message,
            idea : "Idea not found"
        })
    }
}

//controller to create a Idea 
exports.createIdea= async (req,res)=>{
    try{
        const idea=req.body;
        const uploadedIdea = await Idea.create(idea);
        return res.status(201).send({
            message : "Successfully Idea uploaded",
            uploadedIdea : uploadedIdea
        });


    }catch(err){
        return res.status(500).send({
            message : err.message || "Failed to upload Idea"
        });
    }
}

//update idea controller
exports.updateIdea= async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedIdea = await Idea.findByIdAndUpdate(
            id,
            req.body,
            {new : true}
        );
        return res.status(200).send({
            message : "Successfully Updated the Idea",
            updatedIdea : updatedIdea
        })
    }catch(err){
        return res.status(400).send({
            message : err.message || "Failed to update the Idea"
        })
    }
}


// delete idea controller
exports.deleteIdea= async (req,res)=>{
    try{
        const ideaId=req.params.id;
        const exists = await Idea.exists({_id : ideaId});

        if(exists){
            const deletedIdea=await Idea.findByIdAndDelete(ideaId);
            return res.status(200).send({
                message : `Idea with ${ideaId} is deleted`,
                deletedIdea : deletedIdea
            });
        }
        else{
            return res.status(404).send({
                message : `Idea with id : ${ideaId} not found`
            });
        }


    }catch(err){
        return res.status(400).send({
            message : err.message || "Failed to delete the Idea"
        })
    }

}

exports.deleteAll = async (req , res )=>{
    try{
        await Idea.deleteMany({});
        return res.status(200).send({
            message : "All Ideas have been deleted successfully !"
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}