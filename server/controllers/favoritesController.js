import {toggleFavoriteService,getFavoritesService} from "../service/favoriteService.js"

export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;
    const recipeId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // استدعاء خدمة المفضلة
    const { isFavorite } = await userService.toggleFavoriteService(userId, recipeId);

    if (!isFavorite) {
      return res.status(200).json({
        success: true,
        message: "Removed from favorites successfully 💔",
        isFavorite: false,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Added to favorites successfully ❤️",
        isFavorite: true,
      });
    }

  } catch (error) {
    if (error.message === "RECIPE_NOT_FOUND") {
      return res.status(404).json({ error: "Recipe not found" });
    }
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    }

    console.error("Toggle favorite error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};



export const getFavorites = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // استدعاء خدمة جلب المفضلة
    const favorites = await userService.getFavoritesService(userId);

    return res.status(200).json({
      success: true,
      count: favorites.length,
      favorites,
    });
  } catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    }

    console.error("Get favorites error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};