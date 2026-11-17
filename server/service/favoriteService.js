import User from "../models/User.js";
import Recipe from "../models/Recipe.js";

export const toggleFavoriteService = async (userId, recipeId) => {
    // التأكد من وجود الوصفة
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new Error("RECIPE_NOT_FOUND");
    }

    // التأكد من وجود المستخدم
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    // فحص هل الوصفة موجودة مسبقاً في المفضلة
    const isFavorite = user.favorites.includes(recipeId);

    if (isFavorite) {
        // إزالة من المفضلة
        user.favorites.pull(recipeId);
        await user.save();
        return { isFavorite: false };
    } else {
        // إضافة للمفضلة
        user.favorites.push(recipeId);
        await user.save();
        return { isFavorite: true };
    }
};

export const getFavoritesService = async (userId) => {
    const user = await User.findById(userId).populate({
        path: "favorites",
        populate: { path: "author", select: "username email" }
    });

    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }

    return user.favorites;
};
