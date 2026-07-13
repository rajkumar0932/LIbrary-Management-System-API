import mongoose from "mongoose";

// review model - a star rating + optional text a user leaves on a book
const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
      min: [1, "rating must be at least 1"],
      max: [5, "rating cannot be more than 5"],
    },
    review: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

// one review per user per book (cant review the same book twice)
reviewSchema.index({ user: 1, book: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);
