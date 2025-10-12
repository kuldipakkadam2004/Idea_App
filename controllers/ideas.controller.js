
const Idea=require("../models/ideas.model");
const {getRedisClient} = require("../configs/redis");


const redisClient = getRedisClient();

(async () =>{
    let documentCount = await Idea.countDocuments({})
})();

//controller to fetch all the ideas present in the system
exports.getAllIdeas = async (req,res)=>{
    try{
        const cachedIdeas = await redisClient.get("all_ideas"); 
        if(cachedIdeas){
            console.log("Serving from redis cache")
            return res.status(200).json(JSON.parse(cachedIdeas))
        }

        const ideas = await Idea.find();
        await redisClient.setEx("all_ideas",60,JSON.stringify(ideas));

        if(ideas.length > 0){
            return res.status(200).json({
                message : "All Ideas fetched successfully",
                Ideas : ideas,

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
        const cachedIdea = await redisClient.get(`idea_${id}`)
        if(cachedIdea){
            console.log("Serving from redis cache");
            return res.status(200).json(JSON.parse(cachedIdea));
        }

        const idea = await Idea.findById(id);
        if(idea){
            await redisClient.setEx(`idea_${id}`,60,JSON.stringify(idea));
            return res.status(200).json({
                idea : idea
            });
        }
        else{
            return res.status(404).json({
                message : `Idea with id :  ${id} not found`
            })
        }
    }catch(err){
        return res.status(500).json({
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
        await redisClient.del("all_ideas");

        return res.status(201).json({
            message : "Successfully Idea uploaded",
            uploadedIdea : uploadedIdea
        });


    }catch(err){
        return res.status(500).json({
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
        await redisClient.del("all_ideas");
        await redisClient.del(`idea_${id}`)

        return res.status(200).json({
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
            await redisClient.del("all_ideas");
            await redisClient.del(`idea_${ideaId}`);

            return res.status(200).json({
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
        await redisClient.del("all_ideas");
        return res.status(200).json({
            message : "All Ideas have been deleted successfully !"
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : "Internal server error"
        })
    }
}