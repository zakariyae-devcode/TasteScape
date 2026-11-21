import Recipe from "../models/Recipe.js";

export const addReviewService = async (recipeId, userId, { rating, comment }) => {
    // 1. البحث عن الوصفة
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new Error("RECIPE_NOT_FOUND");
    }

    // 2. التحقق مما إذا كان المستخدم قد علق مسبقاً
    const existingReview = recipe.reviews.find(
        (rev) => rev.user.toString() === userId.toString()
    );

    if (existingReview) {
        throw new Error("ALREADY_REVIEWED");
    }

    // 3. إضافة التقييم الجديد
    recipe.reviews.push({
        user: userId,
        rating,
        comment
    });

    // 4. إعادة حساب متوسط التقييم (Average Rating)
    const totalReviews = recipe.reviews.length;
    const sumRatings = recipe.reviews.reduce((acc, item) => acc + item.rating, 0);
    recipe.averageRating = Number((sumRatings / totalReviews).toFixed(1));

    await recipe.save();
    return recipe;
};


export const deleteReviewService = async (recipeId, reviewId, userId, userRole) => {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) throw new Error("RECIPE_NOT_FOUND");

    const review = recipe.reviews.id(reviewId);
    if (!review) throw new Error("REVIEW_NOT_FOUND");

    const isAuthor = review.user.toString() === userId.toString();
    const isAdmin = userRole === "admin";

    if (!isAuthor && !isAdmin) {
        throw new Error("UNAUTHORIZED");
    }

    // حذف التقييم باستخدام ميثود Mongoose المدمجة الفرعية
    recipe.reviews.pull(reviewId);

    // إعادة حساب متوسط التقييمات (إذا لم يتبق تقييمات يصبح 0)
    if (recipe.reviews.length > 0) {
        const totalReviews = recipe.reviews.length;
        const sumRatings = recipe.reviews.reduce((acc, item) => acc + item.rating, 0);
        recipe.averageRating = Number((sumRatings / totalReviews).toFixed(1));
    } else {
        recipe.averageRating = 0;
    }

    await recipe.save();
    return recipe;
};


export const getAllReviewService = async ({ page = 1, limit = 10, recipeId, userId } = {}) => {
  const filter = {};

  if (recipeId) {
    filter.recipe = recipeId;
  }

  if (userId) {
    filter.user = userId;
  }

  const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);
  const limitNumber = Math.min(100, Math.max(1, Number.parseInt(limit, 10) || 10));
  const skip = (pageNumber - 1) * limitNumber;

  const [reviews, total] = await Promise.all([
    Review.find(filter)
      .populate("user", "username email")
      .populate("recipe", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber),
    Review.countDocuments(filter),
  ]);

  return {
    reviews,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};