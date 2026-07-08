import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "book title is required"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    isbn: {
      type: String,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      index: true, // you'll filter by this a lot
    },
    description: {
      type: String,
      trim: true,
    },
    publishedYear: {
      type: Number,
    },
    publisher: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      default: "English",
    },
    totalCopies: {
      type: Number,
      default: 1,
      min: [0, "Total copies cannot be negative"],
    },
    availableCopies: {
      type: Number,
      default: 1,
      min: [0, "Available copies cannot be negative"],
    },
    coverImage: {
      type: String, 
      default: "",
    },
  },
  {
    timestamps: true,
  },
);
export const Book = mongoose.model("Book", bookSchema);
