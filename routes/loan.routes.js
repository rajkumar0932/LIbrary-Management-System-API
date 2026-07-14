import express from "express";
import {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  returnLoan,
} from "../controllers/loan.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// everything here needs a logged in user
router.get("/", verifyToken, getAllLoans);
router.get("/:id", verifyToken, getLoanById);

router.post("/", verifyToken, createLoan);
router.put("/:id", verifyToken, updateLoan);

// delete a loan = mark it as returned (puts the copy back). matches the assignment
router.delete("/:id", verifyToken, returnLoan);

export default router;
