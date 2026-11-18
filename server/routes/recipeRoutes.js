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


const router = express.Router();


router.get("/",  getAllRecipes);
router.get("/:id", getRecipeById);

router.get("/my-recipes",  verifyAuth, getMyRecipes);
router.post("/", verifyAuth,upload.single("image"), createRecipe);
router.put("/:id", verifyAuth, updateRecipe);
router.delete("/:id", verifyAuth, deleteRecipe);

export default router;