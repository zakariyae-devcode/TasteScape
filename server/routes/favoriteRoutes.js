import express from "express";
import { toggleFavorite, getFavorites } from "../controllers/favoritesController.js";

import { verifyAuth } from "../middlewares/auth.js";

const router = express.Router();

// جلب كل الوصفات المفضلة للمستخدم الحالي
router.get("/favorites", verifyAuth, getFavorites);

// إضافة أو إزالة وصفة من المفضلة عبر معرفها
router.post("/recipes/:id/favorite", verifyAuth, toggleFavorite);

export default router;