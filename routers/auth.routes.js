const express = require("express");
const authController = require("../controllers/auth.controller");
const userMW= require("../middlewares/users.mw")
const route = express.Router();

//signup route
route.post("/auth/signup",userMW.validatePOSTReqBody,authController.signup);

//signin route
route.post("/auth/signin",userMW.validateSigninReq,authController.signin);

route.post("/auth/refresh",authController.refresh);


module.exports= route;