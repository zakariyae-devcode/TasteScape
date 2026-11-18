import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  getMyRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipeController.js";

import { verifyAuth } from "../middlewares/auth.js";

import { upload } from "../middlewares/upload.js";

import { cacheMiddleware } from "../middlewares/cacheMiddleware.js";

const router = express.Router();


router.get("/", cacheMiddleware(300), getAllRecipes);
router.get("/:id", cacheMiddleware(600),getRecipeById);

router.get("/my-recipes", cacheMiddleware(600), verifyAuth, getMyRecipes);
router.post("/", verifyAuth,upload.single("image"), createRecipe);
router.put("/:id", verifyAuth, updateRecipe);
router.delete("/:id", verifyAuth, deleteRecipe);

export default router;