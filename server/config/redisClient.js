import { createClient } from "redis";
import {env} from "./env.js";

const redisClient = createClient({
    url: env.REDIS_URL 
});

redisClient.on("error", (err) => console.error("Redis Client Error", err));

await redisClient.connect();
console.log("Connected to Redis successfully! 🚀");

export default redisClient;