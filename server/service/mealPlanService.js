import MealPlan from "../models/MealPlan.js";

// 1. إضافة أو تحديث جدول الوجبات لأسبوع معين
export const upsertMealPlanService = async (userId, weekStartDate, daysData) => {
    let mealPlan = await MealPlan.findOne({ user: userId, weekStartDate });

    if (mealPlan) {
        // تحديث الخطة إذا كانت موجودة مسبقاً
        mealPlan.days = daysData;
        await mealPlan.save();
    } else {
        // إنشاء خطة جديدة
        mealPlan = new MealPlan({
            user: userId,
            weekStartDate,
            days: daysData
        });
        await mealPlan.save();
    }

    return mealPlan;
};

// 2. خوارزمية قائمة التسوق الذكية (Smart Grocery List)
export const generateSmartGroceryListService = async (userId, weekStartDate) => {
    // 1. جلب جدول الوجبات للأسبوع مع جلب المكونات وعناوين الوصفات فقط
    const mealPlan = await MealPlan.findOne({ user: userId, weekStartDate })
        .populate({
            path: "days.meals.recipe",
            select: "title ingredients"
        });

    if (!mealPlan) {
        throw new Error("MEAL_PLAN_NOT_FOUND");
    }

    // 2. استخدام Map لجمع ودمج المكونات المتشابهة لمنع التكرار
    const groceryMap = new Map();

    mealPlan.days.forEach(day => {
        day.meals.forEach(mealItem => {
            const recipe = mealItem.recipe;
            if (recipe && recipe.ingredients && Array.isArray(recipe.ingredients)) {
                recipe.ingredients.forEach(ingredientText => {
                    if (!ingredientText) return;

                    // تنظيف النص لتوحيد المطابقة (حروف صغيرة وبدون مسافات زائدة)
                    const cleanKey = ingredientText.toLowerCase().trim();

                    if (groceryMap.has(cleanKey)) {
                        // إذا كان المكون موجوداً من قبل، نزيد عدد مرات تكراره أو ندمجه
                        const existing = groceryMap.get(cleanKey);
                        existing.count += (mealItem.servings || 1);
                    } else {
                        // إذا كان يظهر لأول مرة
                        groceryMap.set(cleanKey, {
                            item: ingredientText, // النص الأصلي كما كتبه المستخدم
                            count: mealItem.servings || 1,
                            checked: false
                        });
                    }
                });
            }
        });
    });

    // 3. تحويل الـ Map إلى مصفوفة نظيفة جاهزة للواجهة الأمامية
    return Array.from(groceryMap.values());
};