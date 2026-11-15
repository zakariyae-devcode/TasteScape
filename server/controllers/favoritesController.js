import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

// أ. تبديل حالة المفضلة (إضافة / إزالة)
export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;
    const recipeId = req.params.id;

    // التأكد من وجود الوصفة
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // فحص هل الوصفة موجودة مسبقاً في المفضلة
    const isFavorite = user.favorites.includes(recipeId);

    if (isFavorite) {
      // إزالة من المفضلة
      user.favorites.pull(recipeId);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Removed from favorites successfully 💔",
        isFavorite: false,
      });
    } else {
      // إضافة للمفضلة
      user.favorites.push(recipeId);
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Added to favorites successfully ❤️",
        isFavorite: true,
      });
    }
  } catch (error) {
    console.error("Toggle favorite error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// ب. جلب قائمة وصفات المفضلة الخاصة بالمستخدم
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;

    const user = await User.findById(userId).populate({
      path: "favorites",
      populate: { path: "author", select: "username email" } // جلب بيانات صاحب الوصفة أيضاً
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      count: user.favorites.length,
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};