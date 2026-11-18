import express from "express";
import { exportRecipePdf } from "../controllers/pdfController.js";
import { verifyAuth } from "../middlewares/auth.js";

const router = express.Router();

// مسار تحميل الوصفة كملف PDF
router.get("/recipes/:id/pdf", verifyAuth, exportRecipePdf);

export default router;