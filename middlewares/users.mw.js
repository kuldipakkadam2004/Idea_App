const users = require("../models/user.model")

//signup middleware
exports.validatePOSTReqBody = async (req,res,next)=>{
    try {
        const req_obj = req.body;

        if(! req_obj["name"]){
            return res.status(400).send({
                message : "Please give the userName"
            })
        }
        if(! req_obj["email"]){
            return res.status(400).send({
                message : "Please enter the email"
            })
        }

        if(! req_obj["role"]){
            return res.status(400).send({
                message : "Please enter the role"
            })
        }

        if(! req_obj["password"]){
            return res.status(400).send({
                message : "Please enter the password"
            })
        }

        const email = await users.exists({email : req_obj.email});

        if(email){
            return res.status(409).send({
                message : "User with this email already exists"
            })
        }
        next();
    }catch(err){
        res.status(500).send({
            message : "Internal server error"
        })
        console.log(err.message);
    }
} 

//signin middlware
exports.validateSigninReq = async (req,res,next)=>{
    try {
        const user = req.body;
        
        if(!user.email){
            return res.status(400).send({
                message : "Email caanot be empty"
            })
        }
        if(!user.password){
            return res.status(400).send({
                message : "Password cannot be empty"
            })
        }

        next();
    }catch(err){
        res.status(500).send({
            message : "Internal server error"
        })
        console.log(err.message);
    }
}