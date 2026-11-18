import express from "express";
import { upsertMealPlan, getSmartGroceryList } from "../controllers/mealPlanController.js";
import { protect } from "../middlewares/authMiddleware.js"; // ميدلوه المصادقة لديك

const router = express.Router();

// حماية جميع المسارات التالية لتتطلب تسجيل الدخول
router.use(protect);

// مسار حفظ أو تحديث مخطط الوجبات (POST)
router.post("/", upsertMealPlan);

// مسار جلب قائمة التسوق الذكية للأسبوع (GET)
router.get("/grocery-list", getSmartGroceryList);

export default router;