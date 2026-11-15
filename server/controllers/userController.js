import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;

    // جلب بيانات المستخدم بدون كلمة المرور، مع جلب المفضلة
    const user = await User.findById(userId).select("-password").populate("favorites");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // جلب الوصفات الخاصة بالمستخدم الحالي
    const userRecipes = await Recipe.find({ author: userId });

    return res.status(200).json({
      success: true,
      user,
      recipes: userRecipes,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};