import { recipeValidation, updateRecipeValidation } from "../validation/recipeValidation.js";
import {
    createNewRecipeService,
    updateRecipeService,
    deleteRecipeService,
    getAllRecipesService,
    getRecipeByIdService,
    getMyRecipesService,
} from "../services/recipeService.js";

import fs from "fs/promises";

// دالة مساعدة لتنظيف الملف المرفوع عند حدوث خطأ
const cleanupFile = async (file) => {
  if (file?.path) {
    await fs.unlink(file.path).catch(() => {});
  }
};

// 1. إنشاء وصفة جديدة
export const createRecipe = async (req, res) => {
    try {
        const validationResult = recipeValidation.safeParse(req.body);

        if (!validationResult.success) {
            await cleanupFile(req.file);
            const errorMessages = validationResult.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessages });
        }

        const userId = req.user?.userId || req.userId;

        if (!userId) {
            await cleanupFile(req.file);
            return res.status(401).json({ error: "Unauthorized; please log in first." });
        }

        // تم الاعتماد على verifyRole في الـ Middleware للتحقق من الـ admin

        const recipe = await createNewRecipeService(
            validationResult.data,
            req.file,
            userId
        );

        return res.status(201).json({
            message: "The recipe has been created successfully! 🍲",
            recipe,
        });
    }  
    catch (error) {
        await cleanupFile(req.file);
        console.error("Create recipe error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// 2. تحديث وصفة
export const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const userId = req.user?.userId || req.userId;
        const userRole = req.user?.role;

        const validationResult = updateRecipeValidation.safeParse(req.body);
        if (!validationResult.success) {
            await cleanupFile(req.file);
            const errorMessages = validationResult.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessages });
        }

        if (!userId) {
            await cleanupFile(req.file);
            return res.status(401).json({ error: "Unauthorized; please log in first." });
        }

        // استخدام الدالة المستوردة مباشرة بدون recipeService.
        const updatedRecipe = await updateRecipeService(
            recipeId,
            validationResult.data,
            req.file,
            userId,
            userRole
        );

        return res.status(200).json({
            message: "The recipe has been updated successfully! ✏️",
            recipe: updatedRecipe,
        });

    } catch (error) {
        await cleanupFile(req.file);

        if (error.message === "RECIPE_NOT_FOUND") {
            return res.status(404).json({ error: "Recipe not found" });
        }
        if (error.message === "UNAUTHORIZED") {
            return res.status(403).json({ error: "You are not authorized to modify this recipe." });
        }

        console.error("Update recipe error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// 3. حذف وصفة
export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user?.userId || req.userId;
    const userRole = req.user?.role;

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // استدعاء خدمة الحذف مباشرة
    await deleteRecipeService(recipeId, userId, userRole);

    return res.status(200).json({
      message: "The recipe has been deleted successfully 🗑️",
    });

  } catch (error) {
    if (error.message === "RECIPE_NOT_FOUND") {
        return res.status(404).json({ error: "Recipe not found" });
    }
    if (error.message === "UNAUTHORIZED") {
        return res.status(403).json({ error: "You are not authorized to delete this recipe" });
    }

    console.error("Delete recipe error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 4. جلب جميع الوصفات مع الفلاتر والترقيم
export const getAllRecipes = async (req, res) => {
    try {
        const result = await getAllRecipesService(req.query);

        return res.status(200).json({
            success: true,
            currentPage: result.currentPage,
            totalPages: result.totalPages,
            totalRecipes: result.totalRecipes,
            count: result.recipes.length,
            recipes: result.recipes,
        });
    } 
    catch (error) {
        console.error("Get all recipes error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

// 5. جلب وصفة محددة عبر الـ ID
export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const recipe = await getRecipeByIdService(recipeId);

    return res.status(200).json({
      success: true,
      recipe,
    });
  } catch (error) {
    if (error.message === "RECIPE_NOT_FOUND") {
        return res.status(404).json({ error: "Recipe not found" });
    }

    console.error("Get recipe by id error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// 6. جلب وصفات المستخدم الحالي فقط
export const getMyRecipes = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    const recipes = await getMyRecipesService(userId);

    return res.status(200).json({
      success: true,
      count: recipes.length,
      recipes,
    });

  } catch (error) {
    console.error("Get my recipes error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};