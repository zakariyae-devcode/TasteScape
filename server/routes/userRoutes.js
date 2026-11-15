import express from "express";
import { getUserProfile } from "../controllers/userController.js";
import {verifyAuth} from "../middlewares/auth.js"

const router = express.Router();

// مسار جلب الملف الشخصي
router.get("/profile", verifyAuth, getUserProfile);

export default router;