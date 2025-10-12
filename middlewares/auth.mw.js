const utils = require("../utils/jwt");

const verifyToken=(req,res,next)=>{
    const auth = req.headers.authorization;

    if(!auth || !auth.startsWith("Bearer ")){
        return res.status(401).json({
            message : "No token provided"
        });
    }
    const token = auth.split(" ")[1];
    try{
        const decoded = utils.verifyAccessToken(token);
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