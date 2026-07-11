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

const router = express.Router();

// public
router.get("/", getAllBooks);
router.get("/:id", getBookById);

// protected (need token)
router.post("/", verifyToken, createBook);
router.put("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);
router.patch("/:id/upload-cover", verifyToken, uploadCover, uploadBookCover);

export default router;
