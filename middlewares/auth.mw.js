const jwt=require("jsonwebtoken");
const config = require("../configs/auth.config");

const verifyToken=(req,res,next)=>{
    const token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).send({
            message : "No token provided"
        });
    }
    try{
        const decoded = jwt.verify(token,config.secret);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).send({
            message : "UnAuthorized !"
        });
    }

}

module.exports= {
    verifyToken : verifyToken
}