import express from "express";
import {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  returnLoan,
} from "../controllers/loan.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// everything here needs a logged in user
router.get("/", verifyToken, getAllLoans);
router.get("/:id", verifyToken, getLoanById);

router.post("/", verifyToken, createLoan);

// keep return above the plain /:id put so the word "return" isnt read as an id thing
router.patch("/:id/return", verifyToken, returnLoan);

router.put("/:id", verifyToken, updateLoan);
router.delete("/:id", verifyToken, deleteLoan);

export default router;
