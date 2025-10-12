const redis = require("redis");

let redisClient;

const connectRedis = async()=>{
    try{
        redisClient = redis.createClient({url : process.env.REDIS_URL});

        redisClient.on("err",(err)=>{
            console.err("Redis error",err);
        })
        redisClient.on("connect",()=>{
            console.log("Redis connected...");
        })

        await redisClient.connect();

    }catch(err){
        console.log("Redis error..",err.message);
    }
}

const getRedisClient = () => redisClient;

module.exports = {
    connectRedis,
    getRedisClient
}