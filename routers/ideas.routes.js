//Routing Layer: defines the HTTP route /ideas and connects it to the controllers method.

const express = require("express");
const route=express.Router();
const idea_controller= require("../controllers/ideas.controller");
const idea_mw=require("../middlewares/ideas.mw");
const auth_mw=require("../middlewares/auth.mw");
const checkRole = require("../middlewares/role.mw");

//route to fetch all ideas
route.get("/ideas",[auth_mw.verifyToken],idea_controller.getAllIdeas);


//route to get Idea based on Id
route.get("/ideas/:id",[auth_mw.verifyToken],idea_controller.getIdeaBasedOnId); 


//route for uploading the new Idea
route.post("/ideas",[auth_mw.verifyToken,idea_mw.validatePOSTReqBody],idea_controller.createIdea);


//route for updating the existing Idea
route.put("/ideas/:id",[auth_mw.verifyToken,idea_mw.validateIdeaId,idea_mw.validatePOSTReqBody],idea_controller.updateIdea);

//route for deleting all Ideas
route.delete("/ideas/deleteAll",[auth_mw.verifyToken ,checkRole("admin")],idea_controller.deleteAll);

//route for deleting an Idea
route.delete("/ideas/:id",[auth_mw.verifyToken , checkRole("admin")],idea_controller.deleteIdea);



//exports the router for use in the main app.
module.exports=route;
