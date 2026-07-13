import {
  getBookReviewsService,
  findUserReviewService,
  getReviewByIdService,
  createReviewService,
  deleteReviewService,
} from "../services/review.service.js";
import { Book } from "../models/Book.models/Book.models.js";

// get all reviews for a book (public)
export const getBookReviews = async (req, res, next) => {
  try {
    const result = await getBookReviewsService(req.params.id, req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// add a review on a book. one review per user per book
export const createReview = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    // dont let the same person review it twice
    const already = await findUserReviewService(req.user.id, req.params.id);
    if (already) {
      return res.status(409).json({ message: "You have already reviewed this book" });
    }

    const review = await createReviewService(req.user.id, req.params.id, req.body);
    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    next(err);
  }
};

// update a review - only the person who wrote it can
export const updateReview = async (req, res, next) => {
  try {
    const review = await getReviewByIdService(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only update your own review" });
    }

    if (req.body.rating !== undefined) review.rating = req.body.rating;
    if (req.body.review !== undefined) review.review = req.body.review;
    await review.save(); // runs the min/max validators

    await review.populate({ path: "user", select: "name" });
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (err) {
    next(err);
  }
};

// delete a review - only the author
export const deleteReview = async (req, res, next) => {
  try {
    const review = await getReviewByIdService(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own review" });
    }

    await deleteReviewService(req.params.reviewId);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};
