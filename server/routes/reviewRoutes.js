import express from "express";

import {addReview} from "../controllers/reviewController.js";
 
import {verifyAuth} from "../middlewares/auth.js"

const router=express.Router();
router.post("/:id/reviews", verifyAuth, addReview);

export default router;