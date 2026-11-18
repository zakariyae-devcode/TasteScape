import express from "express";
import { upsertMealPlan, getSmartGroceryList } from "../controllers/mealPlanController.js";
import { verifyAuth } from "../middlewares/auth.js"; // ميدلوه المصادقة لديك

const router = express.Router();

// حماية جميع المسارات التالية لتتطلب تسجيل الدخول
router.use(verifyAuth);

// مسار حفظ أو تحديث مخطط الوجبات (POST)
router.post("/", upsertMealPlan);

// مسار جلب قائمة التسوق الذكية للأسبوع (GET)
router.get("/grocery-list", getSmartGroceryList);

export default router;