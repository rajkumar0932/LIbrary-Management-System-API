import {
  getAllLoansService,
  getLoanByIdService,
  createLoanService,
  updateLoanService,
  deleteLoanService,
} from "../services/loan.service.js";
import { Book } from "../models/Book.models/Book.models.js";

// get all loans
export const getAllLoans = async (req, res, next) => {
  try {
    const result = await getAllLoansService(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getLoanById = async (req, res, next) => {
  try {
    const loan = await getLoanByIdService(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.status(200).json(loan);
  } catch (err) {
    next(err);
  }
};

// borrow a book -> creates a loan and takes one copy off the shelf
export const createLoan = async (req, res, next) => {
  try {
    const { book, dueDate } = req.body;

    const theBook = await Book.findById(book);
    if (!theBook) return res.status(404).json({ message: "Book not found" });

    if (theBook.availableCopies < 1) {
      return res.status(400).json({ message: "No copies available to borrow" });
    }

    // create the loan first, if that fails we dont touch the copies
    const loan = await createLoanService(req.user.id, { book, dueDate });

    theBook.availableCopies -= 1;
    await theBook.save();

    res.status(201).json({ message: "Book borrowed successfully", loan });
  } catch (err) {
    next(err);
  }
};

// return a borrowed book -> marks loan returned and puts the copy back
export const returnLoan = async (req, res, next) => {
  try {
    const loan = await getLoanByIdService(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    if (loan.status === "returned") {
      return res.status(400).json({ message: "Loan already returned" });
    }

    loan.status = "returned";
    loan.returnedDate = new Date();
    await loan.save();

    // give the copy back
    await Book.findByIdAndUpdate(loan.book._id, { $inc: { availableCopies: 1 } });

    res.status(200).json({ message: "Book returned successfully", loan });
  } catch (err) {
    next(err);
  }
};

export const updateLoan = async (req, res, next) => {
  try {
    const loan = await updateLoanService(req.params.id, req.body);
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.status(200).json({ message: "Loan updated successfully", loan });
  } catch (err) {
    next(err);
  }
};

export const deleteLoan = async (req, res, next) => {
  try {
    const loan = await deleteLoanService(req.params.id);
    if (!loan) return res.status(404).json({ message: "Loan not found" });

    // if the loan was never returned, put the copy back so counts stay right
    if (loan.status === "active") {
      await Book.findByIdAndUpdate(loan.book, { $inc: { availableCopies: 1 } });
    }

    res.status(200).json({ message: "Loan deleted successfully" });
  } catch (err) {
    next(err);
  }
};
