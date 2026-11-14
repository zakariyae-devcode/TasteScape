import jwt from "jsonwebtoken";
import {env} from '../config/env.js';

export const generateAccessToken =(user)=>{
    return jwt.sign({userId:user._id},env.JWT_SECRET,{expiresIn:'5m'});

}

export const generateRefreshToken =(user)=>{
    return jwt.sign({userId:user._id},env.JWT_SECRET,{expiresIn:'2d'});
}
