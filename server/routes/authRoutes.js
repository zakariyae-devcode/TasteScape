import express from 'express';
import { register, login,loginAdmin, logout, refreshAccessToken } from '../controllers/authController.js';
import {verifyAuth} from "../middlewares/auth.js"

import { verifyRole } from "../middlewares/role.js";

const router=express.Router();

router.post("/register",verifyRole("user"),register);

router.post("/login",verifyRole("user"),login);

router.post("/login-admin",verifyRole("admin"),loginAdmin);

router.post("/refresh",verifyAuth,refreshAccessToken);

router.post("/logout",verifyAuth,logout);

