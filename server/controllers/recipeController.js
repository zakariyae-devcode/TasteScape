import {recipeValidation, updateRecipeValidation} from "../validation/recipeValidation.js";
import  
{
    createNewRecipeService,
    updateRecipeService,
    deleteRecipeService,
    getAllRecipesService,
    getRecipeByIdService,
    getMyRecipesService,


} from "../services/recipeService.js";

import fs from "fs/promises";

const cleanupFile = async (file) => {
  if (file?.path) {
    await fs.unlink(file.path).catch(() => {});
  }
};

export const createRecipe = async (req, res) => {
    try 
    {
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

        const userRole = req.user?.role;
        if (userRole !== "admin") {
            await cleanupFile(req.file);
            return res.status(403).json({ error: "Access denied. Only admins can create recipes." });
        }

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
    catch (error) 
    {
        await cleanupFile(req.file);
        console.error("Create recipe error:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const userId = req.user?.userId || req.userId;
        const userRole = req.user?.role;

        // 1. التحقق من صحة البيانات عبر Zod
        const validationResult = updateRecipeValidation.safeParse(req.body);
        if (!validationResult.success) {
            if (req.file) await fs.unlink(req.file.path).catch(() => {});
            const errorMessages = validationResult.error.errors.map((err) => err.message);
            return res.status(400).json({ errors: errorMessages });
        }

        if (!userId) {
            if (req.file) await fs.unlink(req.file.path).catch(() => {});
            return res.status(401).json({ error: "Unauthorized; please log in first." });
        }

        // 2. استدعاء خدمة التحديث
        const updatedRecipe = await recipeService.updateRecipeService(
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
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }

        // التعامل مع الأخطاء القادمة من الـ Service
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



export const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user?.userId || req.userId;
    const userRole = req.user?.role; // تم إضافة استخراج الدور لتجنب الخطأ

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // استدعاء خدمة الحذف
    await recipeService.deleteRecipeService(recipeId, userId, userRole);

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



export const getAllRecipes = async (req, res) => {
    try {
        const result = await recipeService.getAllRecipesService(req.query);

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


export const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;

    const recipe = await recipeService.getRecipeByIdService(recipeId);

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


export const getMyRecipes = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // جلب الوصفات التي تطابق معرف المستخدم الحالي كـ author
    const recipes = await Recipe.find({ author: userId })
      .sort({ createdAt: -1 }); // ترتبيها من الأحدث للأقدم

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

export const getMyRecipes = async (req, res) => {
  try {
    const userId = req.user?.userId || req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized; please log in first." });
    }

    // استدعاء خدمة جلب وصفات المستخدم
    const recipes = await recipeService.getMyRecipesService(userId);

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