//4
//Routing Layer: The third file (ideas.routes) defines the HTTP route /ideas and connects it to the controller’s method.


const express = require("express");

/*You do .Router() to:

Create a modular routing system

Keep route files clean and separate

Avoid bloating your main app file
*/
const route=express.Router();

const idea_controller= require("../controllers/ideas.controller");
// route for fetch all ideas
//Defines a GET route at /ideas that calls the controller’s getAllIdeas method.
//here we are calling getAllIdeas function
route.get("/ideas",idea_controller.getAllIdeas);
//This means when a GET request hits /ideas, it will respond with all the ideas.


route.get("/ideas/:id",idea_controller.getIdeaBasedOnId); 
//above  we write ":" before id because it is dynamic parameter now 
//  Route: /ideas/:id
//Matches: /ideas/1, /ideas/42, /ideas/abc123
// ':id' is a dynamic value


const idea_mw=require("../middlewares/ideas.mw");

route.post("/ideas",idea_mw.validatePOSTReqBody,idea_controller.createIdea);

route.put("/ideas/:id",idea_mw.validatePUTReqBody,idea_controller.updateIdea);

route.delete("/ideas/:id",idea_controller.deleteIdea);









//Exports the router for use in the main app.
module.exports=route;
