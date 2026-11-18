import { generateRecipePdfService } from "../service/pdfService.js";

export const exportRecipePdf = async (req, res, next) => {
    try {
        const recipeId = req.params.id;
        await generateRecipePdfService(recipeId, res);
    } catch (error) {
        if (error.message === "RECIPE_NOT_FOUND") {
            return res.status(404).json({ success: false, error: "Recipe not found" });
        }
        console.error("PDF Export Error:", error);
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};