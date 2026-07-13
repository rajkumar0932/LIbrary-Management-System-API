import { Review } from "../models/Review.models/Review.models.js";

// all reviews for one book, newest first
export const getBookReviewsService = async (bookId, query) => {
  const { page = 1, limit = 10 } = query;

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const filter = { book: bookId };

  const [data, total] = await Promise.all([
    Review.find(filter)
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Review.countDocuments(filter),
  ]);

  return { data, total, page: pageNum, totalPages: Math.ceil(total / limitNum) };
};

// used to stop a user reviewing the same book twice
export const findUserReviewService = (userId, bookId) => {
  return Review.findOne({ user: userId, book: bookId });
};

export const getReviewByIdService = (id) => Review.findById(id);

export const createReviewService = async (userId, bookId, data) => {
  const review = await Review.create({
    user: userId,
    book: bookId,
    rating: data.rating,
    review: data.review,
  });

  return review.populate({ path: "user", select: "name" });
};

export const deleteReviewService = (id) => Review.findByIdAndDelete(id);
