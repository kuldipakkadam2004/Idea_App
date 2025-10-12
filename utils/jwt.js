const jwt = require("jsonwebtoken");

const signinAccessToken = (payload) =>{
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {expiresIn : "15m"}
    )
} 

const signinRefreshToken = (payload) =>{
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {expiresIn : "7d"}
    )
}

const verifyAccessToken = (token) =>{
    return jwt.verify(token , process.env.ACCESS_TOKEN_SECRET_KEY);
} 

const verifyRefreshToken = (token) =>{
    return jwt.verify(token,process.env.REFRESH_TOKEN_SECRET_KEY);
}

module.exports = {
    signinAccessToken,
    signinRefreshToken,
    verifyAccessToken,
    verifyRefreshToken
}