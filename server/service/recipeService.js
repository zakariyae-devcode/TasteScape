import Recipe  from "../models/Recipe.js";

import fs from "fs/promises";
import path from "path";



import redisClient from "../config/redisClient.js";

// دالة لمسح الكاش المتعلق بالوصفات
export const clearRecipeCache = async () => {
    const keys = await redisClient.keys("cache:/api/v1/recipes*");
    if (keys.length > 0) {
        await redisClient.del(keys);
    }
};

export const createNewRecipeService = async (recipeData ,file,userId)=>{
    const imageUrl= file  ? `/uploads/${file.filename}` : undefined;

    const newRecipe = new Recipe({
    ...recipeData,
    imageUrl,
    author: userId,
  });

  await newRecipe.save();
  return newRecipe;

}



export const updateRecipeService = async (recipeId, updateData, file, userId, userRole) => {
    // 1. البحث عن الوصفة
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        if (file) await fs.unlink(file.path).catch(() => {});
        throw new Error("RECIPE_NOT_FOUND");
    }

    // 2. التحقق من الصلاحيات (المالك أو الأدمن)
    const isAuthor = recipe.author.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isAuthor && !isAdmin) {
        if (file) await fs.unlink(file.path).catch(() => {});
        throw new Error("UNAUTHORIZED");
    }

    let imageUrl = recipe.imageUrl; 

    // 3. التعامل مع رفع الصورة الجديدة وحذف القديمة
    if (file) {
        if (recipe.imageUrl) {
            const oldImagePath = path.join(process.cwd(), recipe.imageUrl);
            try {
                await fs.unlink(oldImagePath);
            } catch (err) {
                console.error("Failed to delete old image file:", err);
            }
        }
        imageUrl = `/uploads/${file.filename}`;
    }

    // 4. تنفيذ التحديث في قاعدة البيانات
    const updatedRecipe = await Recipe.findByIdAndUpdate(
        recipeId,
        { $set: updateData, imageUrl },
        { new: true, runValidators: true }
    );

    return updatedRecipe;
};



export const deleteRecipeService = async (recipeId, userId, userRole) => {
    const recipe = await Recipe.findById(recipeId);
    if (!recipe) {
        throw new Error("RECIPE_NOT_FOUND");
    }

    const isAuthor = recipe.author.toString() === userId;
    const isAdmin = userRole === "admin";

    if (!isAuthor && !isAdmin) {
        throw new Error("UNAUTHORIZED");
    }

    // حذف صورة الوصفة من السيرفر إذا كانت موجودة
    if (recipe.imageUrl) {
        const imagePath = path.join(process.cwd(), recipe.imageUrl);
        try {
            await fs.unlink(imagePath);
        } catch (err) {
            console.error("Failed to delete recipe image file:", err);
        }
    }

    await Recipe.findByIdAndDelete(recipeId);
    return true;
};




export const getAllRecipesService = async (queryParams) => {
    const { search, category, page = 1, limit = 10 } = queryParams;
    let query = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } }
        ];
    }
    if (category) {
        query.category = category;
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalRecipes = await Recipe.countDocuments(query);

    // تم تصحيح {query} إلى query مباشرة
    const recipes = await Recipe.find(query)
        .populate("author", "username email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber);

    return {
        recipes,
        currentPage: pageNumber,
        totalPages: Math.ceil(totalRecipes / limitNumber),
        totalRecipes,
    };
};


export const getRecipeByIdService = async (recipeId) => {
    const recipe = await Recipe.findById(recipeId).populate("author", "username email");
    
    if (!recipe) {
        throw new Error("RECIPE_NOT_FOUND");
    }
    
    return recipe;
};

export const getMyRecipesService = async (userId) => {
    const recipes = await Recipe.find({ author: userId }).sort({ createdAt: -1 });
    return recipes;
};