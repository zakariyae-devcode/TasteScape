import express from "express";
import { upsertMealPlan, getSmartGroceryList } from "../controllers/mealPlanController.js";
import { verifyAuth } from "../middlewares/auth.js"; // ميدلوه المصادقة لديك
import { verifyRole } from "../middlewares/role.js";



const router = express.Router();

// حماية جميع المسارات التالية لتتطلب تسجيل الدخول
router.use(verifyAuth);

// مسار حفظ أو تحديث مخطط الوجبات (POST)
router.post("/", verifyAuth,verifyRole("admin"),upsertMealPlan);

// مسار جلب قائمة التسوق الذكية للأسبوع (GET)
router.get("/grocery-list", verifyAuth,verifyRole("admin"),getSmartGroceryList);

export default router;