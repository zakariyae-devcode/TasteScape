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


import { verifyRole } from "../middlewares/role.js";

import { upload } from "../middlewares/upload.js";


const router = express.Router();


router.get("/",  getAllRecipes);
router.get("/:id", getRecipeById);

router.get("/my-recipes",  verifyAuth, verifyRole("admin") , getMyRecipes);
router.post("/", verifyAuth, verifyRole("admin"),upload.single("image"), createRecipe);
router.patch("/:id", verifyAuth, verifyRole("admin") ,updateRecipe);
router.delete("/:id", verifyAuth, verifyRole("admin"), deleteRecipe);

export default router;