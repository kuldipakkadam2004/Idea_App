//3
exports.validatePOSTReqBody=(req,res,next)=>{
    const req_obj=req.body;

    if(!req_obj["idea_name"]){
        return res.status(400).send({
            message : `idea_name is not present in the request object`
        });
    }

    if(!req_obj["author_name"]){
        return res.status(400).send({
            message : `author name is not present in the request object`
        });
    }

    if(!req_obj["idea_description"]){
        return res.status(400).send({
            message : `idea description is not present in the request object`
        });
    }

    next();
}


exports.validatePUTReqBody=(req,res,next)=>{
    const req_obj=req.body;
    const idea_id=req.params.id;

    if( !req_obj["id"]){
        return res.status(400).send({
            message : `id is not present in the request object`
        });
    }

    if(req_obj["id"] != req.params.id){
        return res.status(400).send({
            message : `id field in the body dosent match to the id in the param`
        });
    }

    if(!req_obj["idea_name"]){
        return res.status(400).send({
            message : `idea_name is not present in the request object`
        });
    }

    if(!req_obj["author_name"]){
        return res.status(400).send({
            message : `author name is not present in the request object`
        });
    }

    if(!req_obj["idea_description"]){
        return res.status(400).send({
            message : `idea description is not present in the request object`
        });
    }

    next();
}