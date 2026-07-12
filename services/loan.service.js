import { Loan } from "../models/Loan.models/Loan.models.js";

// get all loans with filters + pagination
export const getAllLoansService = async (query) => {
  const { status, user, book, page = 1, limit = 10 } = query;

  const filter = {};
  if (status) filter.status = status;
  if (user) filter.user = user;
  if (book) filter.book = book;

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    Loan.find(filter)
      .populate("user", "name email")
      .populate("book", "title isbn")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Loan.countDocuments(filter),
  ]);

  return { data, total, page: pageNum, totalPages: Math.ceil(total / limitNum) };
};

export const getLoanByIdService = (id) => {
  return Loan.findById(id)
    .populate("user", "name email")
    .populate("book", "title isbn");
};

// make a loan row and send it back with the user/book filled in
export const createLoanService = async (userId, data) => {
  const loan = await Loan.create({
    user: userId,
    book: data.book,
    dueDate: data.dueDate,
  });

  return loan.populate([
    { path: "user", select: "name email" },
    { path: "book", select: "title isbn" },
  ]);
};

export const updateLoanService = (id, data) => {
  return Loan.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  })
    .populate("user", "name email")
    .populate("book", "title isbn");
};

export const deleteLoanService = (id) => Loan.findByIdAndDelete(id);
