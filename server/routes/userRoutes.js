import express from "express";
import {
  getUserProfile,
  updateProfile,
  deleteMyAccount,
  changePassword,
  getAllAccount,
  deleteUserByAdmin,
  toggleSuspendUser,
} from "../controllers/userController.js";
import { verifyAuth } from "../middlewares/auth.js";
import { verifyRole } from "../middlewares/role.js";

const router = express.Router();

//router public
router.get("/profile", verifyAuth, getUserProfile);
router.patch("/profile", verifyAuth, updateProfile);
router.patch("/change-password", verifyAuth, changePassword);

// Standard user routes
router.delete("/profile", verifyAuth, verifyRole("user"), deleteMyAccount);

// Admin routes
router.get("/profiles", verifyAuth, verifyRole("admin"), getAllAccount);
router.patch("/users/:id/suspend", verifyAuth, verifyRole("admin"), toggleSuspendUser);
router.delete("/users/:id", verifyAuth, verifyRole("admin"), deleteUserByAdmin);

export default router;