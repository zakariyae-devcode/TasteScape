import jwt from "jsonwebtoken";
import {env} from '../config/env.js';
import cookies from 'cookie-parser';

export const generateAccessToken =(user)=>{
    return jwt.sign({userId:user,role:user.role},env.JWT_SECRET,{expiresIn:'5m'});

}

export const generateRefreshToken =(user)=>{
    return jwt.sign({userId:user,role:user.role},env.JWT_SECRET,{expiresIn:'2d'});
}

export const RefreshTokenCookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
};
