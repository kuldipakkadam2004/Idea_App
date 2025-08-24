//4
//Routing Layer: defines the HTTP route /ideas and connects it to the controllers method.

const express = require("express");
const route=express.Router();
const idea_controller= require("../controllers/ideas.controller");
const idea_mw=require("../middlewares/ideas.mw");


//route to fetch all ideas
route.get("/ideas",idea_controller.getAllIdeas);


//route to get Idea based on Id
route.get("/ideas/:id",idea_controller.getIdeaBasedOnId); 


//route for uploading the new Idea
route.post("/ideas",idea_mw.validatePOSTReqBody,idea_controller.createIdea);


//route for updating the existing Idea
route.put("/ideas/:id",idea_mw.validatePUTReqBody,idea_controller.updateIdea);

//route for deleting an Idea
route.delete("/ideas/:id",idea_controller.deleteIdea);


//exports the router for use in the main app.
module.exports=route;
