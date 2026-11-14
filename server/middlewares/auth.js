import jwt from "jsonwebtoken";
import {env} from '../config/env.js';

export const verifyAuth = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Access denied. No token provided." });
        }

        const token = authHeader.split(" ")[1]; // Bearer  97a79ceb331efc2098d5bf951b99318cf5d09248e19db8b0679810b0536c03cf

        const decoded = jwt.verify(token, env.JWT_SECRET);
        req.user = decoded; 

        next();
    }
    catch (err) {
        return res.status(403).json({ error: "Invalid or expired access token." });
    }
};