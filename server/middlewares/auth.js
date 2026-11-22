import jwt from "jsonwebtoken";
import {env} from '../config/env.js';


import User from "../models/User.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: token missing" });
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const userId = decoded.userId || decoded.id || decoded._id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized: invalid token payload" });
    }

    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      return res.status(401).json({ error: "Unauthorized: user not found" });
    }

    req.user = {
      userId: user._id,
      id: user._id,
      role: user.role || decoded.role,
    };
    req.userId = user._id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: invalid or expired token" });
  }
};