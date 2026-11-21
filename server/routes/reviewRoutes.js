import express from "express";

import {addReview,deleteReview,getAllReviews} from "../controllers/reviewController.js";
 
import {verifyAuth} from "../middlewares/auth.js";

import {verifyRole} from "../middlewares/role.js";

const router=express.Router();

router.get("/reviews",verifyAuth,getAllReviews)

router.post("/:id/review", verifyAuth, addReview);
router.delete("/review",verifyRole("admin"),deleteReview);

export default router;