import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import {generateAccessToken} from '../utils/generateToken.js';
import {User} from '../models/userModel.js';


export const refreshToken = (req, res) => 
{
    try{
        const {refreshToken}=req.body;

        if(!refreshToken)
        {
            return res.status(401).json({message:"Refresh token not exists"});
        }

        const user=User.findOne(refreshToken);

        if(!user)
        {
            return res.status(403).json({message:"Refresh token Invalid or Expired"});
        }

        jwt.verify(refreshToken,env.JWT_SECRET,(err,decoded)=>{
            if(err){
                return res.status(403).json({message:"Refresh token  Expired please login again"});
            }
        })

        const newAccessToken= grantAccessToken=generateAccessToken(user._id);

        return res.status(200).json({accessToken:newAccessToken});


    }catch(error)
    {
        console.error("Error refreshing token:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}