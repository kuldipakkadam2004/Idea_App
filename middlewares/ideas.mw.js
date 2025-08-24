//3
const ideas=require("../models/ideas.model")

//middleware for validating POST request body
exports.validatePOSTReqBody=(req,res,next)=>{
    const req_obj=req.body;

    if(!req_obj["idea_name"]){
        return res.status(400).send({
            message : `idea_name is not present in the Idea details`
        });
    }

    if(!req_obj["author_name"]){
        return res.status(400).send({
            message : `author name is not present in the Idea details`
        });
    }

    if(!req_obj["idea_description"]){
        return res.status(400).send({
            message : `idea description is not present in the Idea details`
        });
    }

    next();
}

//validating PUT request body
exports.validatePUTReqBody= async (req,res,next)=>{
    const req_obj=req.body;
    const ideaId=req.params.id;

    const exists = await ideas.exists({_id : ideaId});
    if(!exists){
        return res.status(400).send({
            message : `Idea with id : ${id} is not present`
        })
    }

    if(!req_obj["idea_name"]){
        return res.status(400).send({
            message : `idea_name is not present in the Idea details`
        });
    }

    if(!req_obj["author_name"]){
        return res.status(400).send({
            message : `author name is not present in the Idea details`
        });
    }

    if(!req_obj["idea_description"]){
        return res.status(400).send({
            message : `Idea description is not present in the request object`
        });
    }

    next();
}