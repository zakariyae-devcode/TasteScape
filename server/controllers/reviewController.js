import Review from "../models/Review.js"
import { reviewValidation } from "../validation/reiewValidation.js"; // استيراد المخطط

export const addReview = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user?.userId || req.userId;

    // 1. التحقق من صحة المدخلات باستخدام Zod
    const validationResult = reviewValidation.safeParse(req.body);

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }

    const { rating, comment } = validationResult.data;

    // 2. البحث عن الوصفة
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    // 3. التحقق مما إذا كان المستخدم قد علق مسبقاً
    const existingReview = recipe.reviews.find(
      (rev) => rev.user.toString() === userId.toString()
    );

    if (existingReview) {
      return res.status(400).json({ error: "You have already reviewed this recipe." });
    }

    // 4. إضافة التقييم الجديد
    recipe.reviews.push({
      user: userId,
      rating,
      comment
    });

    // 5. إعادة حساب متوسط التقييم (Average Rating)
    const totalReviews = recipe.reviews.length;
    const sumRatings = recipe.reviews.reduce((acc, item) => acc + item.rating, 0);
    recipe.averageRating = Number((sumRatings / totalReviews).toFixed(1));

    await recipe.save();

    return res.status(201).json({
      success: true,
      message: "Review added successfully ⭐",
      recipe
    });

  } catch (error) {
    console.error("Add review error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};