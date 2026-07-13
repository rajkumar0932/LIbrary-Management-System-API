import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  uploadBookCover,
} from "../controllers/book.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { uploadCover } from "../middleware/upload.middleware.js";
import reviewRoutes from "./review.routes.js";

const router = express.Router();

// reviews live under a book -> /books/:id/reviews
router.use("/:id/reviews", reviewRoutes);

// public
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// protected (need token)
router.post("/", verifyToken, createBook);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);
router.patch("/:id/upload-cover", verifyToken, uploadCover, uploadBookCover);

export default router;
