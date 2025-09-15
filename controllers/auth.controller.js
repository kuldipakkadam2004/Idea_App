const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config")

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
        res.status(201).send(postResponse);
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
        //return the JWT 
        const token = jwt.sign(
            {id : user._id, role : user.role} ,
            config.secret ,
            {expiresIn : "15m"}
        )

        return res.status(200).send({
            name : user.name,
            email : user.email,
            accessToken : token
        });
    }catch(err){
        return res.status(500).send({
            message : "Internal server Error"
        })
    }
}



/**
 * This number determines how many times bcrypt will hash the password internally, 
 *making the hash more secure (but also more computationally expensive).

 * password : bcrypt.hashSync(req,body.password,8)
 */