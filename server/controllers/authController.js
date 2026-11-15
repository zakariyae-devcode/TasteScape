import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import  { registerValidation,loginValidation } from "../schemas/authValidation.js";
import { env } from "../config/env.js";


import {generateAccessToken,generateRefreshToken } from "../utils/generateToken.js";

export const register = async (req, res) => {
    try{
       
       const validationResult = registerValidation.safeParse(req.body);

       if(!validationResult.success){
        const errorsMessage = validationResult.error.errors.map(err =>err.message);
        return res.status(400).json({errors:errorsMessage});

        }

       const {username,email,password} = validationResult.data;

       const existingUser = await User.findOne({$or:[{username},{email}]});
       if(existingUser){
            return res.status(400).json({error:"your provided already used, please choose another one"});
       }
       const hashedPassword = await bcryprt.hash(password,15);
       const newUser = new User({
          username,
          email,
          password:hashedPassword
         });

       await newUser.save();
       return res.status(201).json({ message: "User registered successfully." });
    }
    catch(err){
        console.error("Registration error:", err);
        return res.status(500).json({ error: "Internale server error" });
    }

}
export const login =async (req,res)=>{
    try{

        const validationResult = loginValidation.safeParse(req.boy);

        if(!validationResult.success){
        const errorsMessage = validationResult.error.errors.map(err =>err.message);
        return res.status(400).json({errors:errorsMessage});

        }

        const {email,username,password}=validationResult.data;
        const user=await  await User.findOne({$or:[{username},{email}]});

        if (!user) {
            return res.status(401).json({ error: "your password or email or username incorrect " });
        }
        
        if(user.lockUntil && user.lockUntil > Date.now()){
            return res.status(403).json({ 
                error: "You have exceeded the allowed number of incorrect attempts. Your account has been temporarily locked; please create a new account or try again later.",
                redirectToRegister: true 
            });
        }


        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid)
        {
            user.loginAttempts += 1;


            if(user.loginAttempts>=4)
            {
          
                user.lockUntil=Date.now() + 15 * 60 * 1000;

                await user.save();

                return res.status(403).json({ 
                    error: "Error 4 times! Attempts have been temporarily blocked. Please create a new account.",
                    redirectToRegister: true 
                });
            }
            await user.save();
            const remainingAttempts = 4 - user.loginAttempts;

            return res.status(401).json({ 
                error: `The password is incorrect. You have ${remainingAttempts} attempts remaining` 
            });
        }

        user.loginAttempts = 0;
        user.lockUntil = null;

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 2 * 24 * 60 * 60 * 1000,
        });


        return res.status(200).json({
            message: "تم تسجيل الدخول بنجاح! 🚀",
            accessToken,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch(error){
        console.error("login error:", err);
        return res.status(500).json({ error: "Internale server error" });
    }
}
export const logout = async(req,res)=>{
    try{

        const refreshToken =req.cookie.refreshToken;
        const user = await user.findOne({refreshToken});

        if(!refreshToken)
        {
            return res.status(204).send();
        }
        

        if(user){
            user.refreshToken=null;
            await user.save();
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return res.status(200).json({ message:"you have been logged out successfully " });
    }
    catch(error)
    {
        console.error("logout error:", err);
        return res.status(500).json({ error: "Internale server error" });
    }

}
export const refreshAccessToken = async (req, res) => {
  try {
   
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: "Refresh Token غير موجود في الكوكيز." });
    }

    
    const decoded = jwt.verify(refreshToken, env.JWT_SECRET);

    const user = await User.findOne({ _id: decoded.userId, refreshToken });
    if (!user) {
      return res.status(403).json({ error: "تحذير أمني: Refresh Token غير صالح أو تم استخدامه مسبقاً." });
    }

   
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

   
    user.refreshToken = newRefreshToken;
    await user.save();

    
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 2 * 24 * 60 * 60 * 1000, // يومان
    });

    
    return res.status(200).json({
      accessToken: newAccessToken,
    });

  } catch (err) {
    console.error("Token rotation error:", err);
    return res.status(403).json({ error: "انتهت صلاحية الرمز أو أنه غير صالح." });
  }
};