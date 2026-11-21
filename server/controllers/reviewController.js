import { addReviewService,deleteReviewService,getAllReviewService } from "../service/reviewService.js";
import { reviewValidation } from "../validation/reiewValidation.js"; // استيراد المخطط



export const getAllReviews = async (req, res) => {
  try {
    const { page, limit, recipeId, userId } = req.query;
    const data = await getAllReviewService({ page, limit, recipeId, userId });

    return res.status(200).json(data);
  } catch (err) {
    console.error("Get all reviews error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const addReview = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user?.userId || req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // 1. التحقق من صحة المدخلات باستخدام Zod
    const validationResult = reviewValidation.safeParse(req.body);
    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map((err) => err.message);
      return res.status(400).json({ errors: errorMessages });
    }

    // 2. استدعاء خدمة إضافة التقييم
    const updatedRecipe = await recipeService.addReviewService(
      recipeId, 
      userId, 
      validationResult.data
    );

    return res.status(201).json({
      success: true,
      message: "Review added successfully ⭐",
      recipe: updatedRecipe
    });

  } catch (error) {
    // 3. معالجة الأخطاء القادمة من الـ Service
    if (error.message === "RECIPE_NOT_FOUND") {
      return res.status(404).json({ error: "Recipe not found" });
    }
    if (error.message === "ALREADY_REVIEWED") {
      return res.status(400).json({ error: "You have already reviewed this recipe." });
    }

    console.error("Add review error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteReview = async (req, res) => {
    try {
        const { id: recipeId, reviewId } = req.params;
        const userId = req.user?.userId || req.userId;
        const userRole = req.user?.role;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized; please log in first." });
        }

        const updatedRecipe = await recipeService.deleteReviewService(
            recipeId,
            reviewId,
            userId,
            userRole
        );

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully 🗑️",
            recipe: updatedRecipe,
        });

    } catch (error) {
        if (error.message === "RECIPE_NOT_FOUND") return res.status(404).json({ error: "Recipe not found" });
        if (error.message === "REVIEW_NOT_FOUND") return res.status(404).json({ error: "Review not found" });
        if (error.message === "UNAUTHORIZED") return res.status(403).json({ error: "You are not authorized to delete this review." });

        console.error("Delete review error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};