import express from "express";
import {
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} from "../controllers/author.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllAuthors);
router.get("/:id", getAuthorById);

// these need auth
router.post("/", verifyToken, createAuthor);
router.put("/:id", verifyToken, updateAuthor);
router.delete("/:id", verifyToken, deleteAuthor);

export default router;
