import { getUserProfileService } from "../service/userService.js";

export const getUserProfile = async (req, res) => {
  try 
  {
    const userId = req.user?.userId || req.userId;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized; please log in first." });
      }

    const { user, recipes } = await userService.getUserProfileService(userId);

    return res.status(200).json({
      success: true,
      user,
      recipes: userRecipes,
    });
  } 
  catch (error) {
    if (error.message === "USER_NOT_FOUND") {
      return res.status(404).json({ error: "User not found" });
    }

    console.error("Get profile error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};