import express from "express";
import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe
} from "../controllers/recipeController.js";

import { verifyAuth } from "../middlewares/auth.js";


const router = express.Router();


router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);


router.post("/", verifyAuth, createRecipe);
router.put("/:id", verifyAuth, updateRecipe);
router.delete("/:id", verifyAuth, deleteRecipe);

export default router;