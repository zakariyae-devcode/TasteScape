import express from "express";
import { exportRecipePdf } from "../controllers/pdfController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// مسار تحميل الوصفة كملف PDF
router.get("/recipes/:id/pdf", protect, exportRecipePdf);

export default router;