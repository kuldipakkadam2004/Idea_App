const userModel = require("../models/user.model");
const util = require("../utils/jwt")
const {getRedisClient}= require("../configs/redis")
const redisClient = getRedisClient();
const bcrypt = require("bcrypt");

const cookieOptions = ()=>({
    httpOnly : true,
    secure : false,
    sameSite : "strict",
    maxAge : 1*60*60 * 1000
})

exports.signup = async(req,res)=>{
    const userObj = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role,
        password : bcrypt.hashSync(req.body.password,8)
    }

    try {
        const createdObj = await userModel.create(userObj);
        const postResponse = {
            name : createdObj.name,
            email : createdObj.email,
            role : createdObj.role,
            createdAt : createdObj.createdAt
        }
        res.status(201).json(postResponse);
    }catch(err){
        res.status(500).send({
            message : "Some internal error while inserting document"
        })

        console.log(err.message);
    }
}

//sign in controller
exports.signin = async (req,res)=>{
    try{
        const user = await userModel.findOne({email : req.body.email});
        if(!user){
            return res.status(400).send({
                message : "User doesn't exist"
            })    
        }
        const passwordIsValid = bcrypt.compareSync(req.body.password , user.password);
        if(!passwordIsValid){
            return res.status(400).send({
                message : "Password is incorrect"
            })
        }
        const accessToken=util.signinAccessToken({id : user._id , role : user.role});
        const refreshToken=util.signinRefreshToken({id : user._id , role : user.role});
        await redisClient.setEx(`refresh_${user._id}` , 7 * 24 * 60 * 60 , refreshToken);

        res.cookie("refreshToken" , refreshToken , cookieOptions());
        return res.status(200).json({
            name : user.name,
            email : user.email,
            accessToken : accessToken
        });
    }catch(err){
        return res.status(500).json({
            message : err.message
        })
    }
}

exports.refresh = async (req,res)=>{
    try{
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(401).json({
                message : "No refresh token"
            })
        }
        let payload ;
        try{
            payload = util.verifyRefreshToken(token);
        }catch(err){
            return res.status(403).json({
                message : "Invalid token or expired token"
            })
        }
        const storedToken = await redisClient.get(`refresh_${payload.id}`);
        if(storedToken != token){
            return res.status(403).json({
                message : "Invalid refresh token"
            })
        }

        const accessToken = await util.signinAccessToken({id : payload.id , role : payload.role});
        const refreshToken = await util.signinRefreshToken({id : payload.id , role : payload.role});
        await redisClient.setEx(`refresh_${payload.id}` , 7*24*60*60 , refreshToken);

        res.cookie("refreshToken",refreshToken,cookieOptions());
        res.status(200).json({accessToken : accessToken});
    }catch(err){
        res.status(500).json({message : err.message})
    }
}
