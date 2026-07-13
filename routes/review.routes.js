import express from "express";
import {
  getBookReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

// mergeParams so we still see :id (the book) coming from the book router
const router = express.Router({ mergeParams: true });

// anyone can read the reviews
router.get("/", getBookReviews);

// but you need to be logged in to add / change / remove one
router.post("/", verifyToken, createReview);
router.put("/:reviewId", verifyToken, updateReview);
router.delete("/:reviewId", verifyToken, deleteReview);

export default router;
