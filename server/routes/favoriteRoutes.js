import express from "express";
import { toggleFavorite, getFavorites } from "../controllers/favoritesController.js";

import { verifyAuth } from "../middlewares/auth.js";
import { verifyRole } from "../middlewares/role.js";

const router = express.Router();

// جلب كل الوصفات المفضلة للمستخدم الحالي
router.get("/favorites", verifyAuth,verifyRole("admin"), getFavorites);

// إضافة أو إزالة وصفة من المفضلة عبر معرفها
router.post("/recipes/:id/favorite", verifyAuth, toggleFavorite);

export default router;