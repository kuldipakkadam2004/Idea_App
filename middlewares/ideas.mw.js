const ideas=require("../models/ideas.model");
const {ideaSchema} = require("../schema/joi.validation.schema");

const validate = (schema)=>(req,res,next)=>{
    const {error} =  schema.validate(req.body , {abortEarly : false});
    if(error){
        const messages = error.details.map(d => d.message);
        return res.status(400).send({
            message : messages
        })
    }
    next();
};

//validating POST request body
exports.validatePOSTReqBody = validate(ideaSchema);


exports.validateIdeaId = async (req,res,next)=>{
    const ideaId = req.params.id;
    const exists = await ideas.exists({_id : ideaId});

    if(!exists){
        return res.status(404).send({
            message : `Idea with id : ${ideaId} doesen't exists`
        })
    }
    next();

};