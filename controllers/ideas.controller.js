//2
//Controller Layer: has functions to interact with that data.

const ideas=require("../models/ideas.model");

(async () =>{
    let id = await ideas.countDocuments({})
})();

//controller to fetch all the ideas present in the system
exports.getAllIdeas = async (req,res)=>{
    try{
        const allIdeas= await ideas.find(); 

        if(allIdeas.length > 0){
            res.status(200).send({
                message : "All Ideas fetched successfully",
                Ideas : allIdeas,

            }); 
        }
        else{
            res.status(404).send({
                message : "No ideas found",
                Ideas : []  
            });
        }

    }catch(err){
        res.status(500).send({
            message : err.message
        })
    }
}


 
// controller to get a idea based on id
exports.getIdeaBasedOnId= async (req,res)=>{
    try{
        const id = req.params.id;
        const idea = await ideas.findById(id);

        if(idea){
            res.status(200).send({
                Idea : idea
            });
        }
        else{
            res.status(404).send({
                message : `Idea with id :  ${id} not found`
            })
        }
    }catch(err){
        res.status(500).send({
            message : err.message,
            Idea : "Idea not found"
        })
    }
}

//controller to create a Idea 
exports.createIdea= async (req,res)=>{
    try{
        const idea=req.body;
        const uploadedIdea = await ideas.create(idea);
        res.status(201).send({
            message : "Successfully Idea uploaded",
            uploadedIdea : uploadedIdea
        });


    }catch(err){
        res.status(500).send({
            message : err.message || "Failed to upload Idea"
        });
    }
}

//update idea controller
exports.updateIdea= async (req,res)=>{
    try{
        const id=req.params.id;
        const updatedIdea = await ideas.findByIdAndUpdate(
            id,
            req.body,
            {new : true}
        );
        res.status(200).send({
            message : "Successfully Updated the Idea",
            updatedIdea : updatedIdea
        })
    }catch(err){
        res.status(400).send({
            message : err.message || "Failed to update the Idea"
        })
    }
}


// delete idea controller
exports.deleteIdea= async (req,res)=>{
    try{
        const ideaId=req.params.id;
        const exists = await ideas.exists({_id : ideaId});

        if(exists){
            const deletedIdea=await ideas.findByIdAndDelete(ideaId);
            res.status(200).send({
                message : `Idea with ${ideaId} is deleted`,
                deletedIdea : deletedIdea
            });
        }
        else{
            res.status(404).send({
                message : `Idea with id : ${ideaId} not found`
            });
        }


    }catch(err){
        res.status(400).send({
            message : err.message || "Failed to delete the Idea"
        })
    }

}