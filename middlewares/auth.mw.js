const jwt=require("jsonwebtoken");
const config = require("../configs/auth.config");

const verifyToken=(req,res,next)=>{
    const token = req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({
            message : "No token provided"
        });
    }
    //verify token
    jwt.verify(token,config.secret,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message : "UnAuthorized !"
            });
        }
        next();
    });
}

module.exports= {
    verifyToken : verifyToken
}