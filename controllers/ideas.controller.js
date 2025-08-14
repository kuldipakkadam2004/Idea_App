//2
//Controller Layer: The second file (ideas.controller) has functions to interact with that data.


let ideas=require("../models/ideas.model");

let id=3; // initial last id number of the idea stored

//controller to fetch all the ideas present in the system


exports.getAllIdeas = (req,res)=>{
    //I have to read the idea from the idea model file
    //here we are sending entire object as a response
    res.status(200).send(ideas);
}

//http://localhost:8080/idea_app/v1/ideas/1
//in the above URO there is 1 we call it path param

exports.getIdeaBasedOnId=(req,res)=>{
    const idea_id=req.params.id; //we are writing this because we want the path param

    if(ideas[idea_id]){ // we are accessing the value of the key by its key
        res.status(200).send(ideas[idea_id]);
    }
    else{
        console.log(`Idea with the ${idea_id} is not present`);
        res.status(404).send({
            message : `Idea with the ${idea_id} is not present`
        });
    }
}

exports.createIdea=(req,res)=>{
    id++;
    const idea_oject=req.body;
    idea_oject["id"]=id;
    ideas[id]=idea_oject;
    res.status(201).send(idea_oject);
}

//update idea controller
exports.updateIdea=(req,res)=>{

    const idea_object=req.body;
    const idea_id=req.params.id;

    if(ideas[idea_id]){
        ideas[idea_id]=idea_object;
        idea_object["id"]=parseInt(idea_id);
        res.status(200).send(ideas[idea_id]);
    }
    else{
        res.status(400).send({
            message : `Idea with ${idea_id} is not present`
        });
    }
}

// delete idea controller

exports.deleteIdea=(req,res)=>{
    const idea_id=req.params.id;
    
    if(ideas[idea_id]){
        delete ideas[idea_id];
        res.status(200).send(ideas);
    }
    else{
        res.status(400).send({
            message : `Idea with ${idea_id} is not present in the system`
        });
    }
}