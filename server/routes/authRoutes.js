import express from 'express';
import { register, login,loginAdmin, logout, refreshAccessToken } from '../controllers/authController.js';
import {verifyAuth} from "../middlewares/auth.js"

import { verifyRole } from "../middlewares/role.js";

const router=express.Router();

router.post("/register",register);

router.post("/login", login);

router.post("/login-admin",loginAdmin);

router.post("/refresh",verifyAuth,refreshAccessToken);

router.post("/logout",verifyAuth,logout);

export default router;

