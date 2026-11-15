import jwt from "jsonwebtoken";
import {env} from '../config/env.js';
import cookies from 'cookie-parser';

export const generateAccessToken =(user)=>{
    return jwt.sign({userId:user,role:user.role},env.JWT_SECRET,{expiresIn:'5m'});

}

export const generateRefreshToken =(user)=>{
    return jwt.sign({userId:user,role:user.role},env.JWT_SECRET,{expiresIn:'2d'});
}

