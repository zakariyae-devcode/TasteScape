import { upsertMealPlanService, generateSmartGroceryListService } from "../service/mealPlanService.js";

// 1. إنشاء أو تحديث مخطط الوجبات للأسبوع
export const upsertMealPlan = async (req, res, next) => {
    try {
        const userId = req.user._id; // قادم من ميدلوه المصادقة (Auth Middleware)
        const { weekStartDate, days } = req.body;

        if (!weekStartDate || !days) {
            return res.status(400).json({ success: false, message: "تاريخ بداية الأسبوع والأيام مطلوبة" });
        }

        const mealPlan = await upsertMealPlanService(userId, weekStartDate, days);

        res.status(200).json({
            success: true,
            message: "تم حفظ مخطط الوجبات بنجاح",
            data: mealPlan
        });
    } catch (error) {
        next(error);
    }
};

// 2. توليد واسترجاع قائمة التسوق الذكية
export const getSmartGroceryList = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const { weekStartDate } = req.query; // يتم إرسال تاريخ الأسبوع عبر الـ Query Params

        if (!weekStartDate) {
            return res.status(400).json({ success: false, message: "يجب تحديد تاريخ بداية الأسبوع (weekStartDate)" });
        }

        const groceryList = await generateSmartGroceryListService(userId, weekStartDate);

        res.status(200).json({
            success: true,
            count: groceryList.length,
            data: groceryList
        });
    } catch (error) {
        if (error.message === "MEAL_PLAN_NOT_FOUND") {
            return res.status(404).json({ success: false, message: "لا يوجد مخطط وجبات مسجل لهذا الأسبوع" });
        }
        next(error);
    }
};