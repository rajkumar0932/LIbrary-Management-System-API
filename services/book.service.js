import { Book } from "../models/Book.models/Book.models.js";

// get all books with filters + pagination
export const getAllBooksService = async (query) => {
  const { title, author, category, page = 1, limit = 10 } = query;

  const filter = {};
  if (title) filter.title = { $regex: title, $options: "i" };
  if (category) filter.category = { $regex: category, $options: "i" };
  if (author) filter.author = author;

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    Book.find(filter)
      .populate("author")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Book.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  };
};

export const getBookByIdService = (id) => {
  return Book.findById(id).populate("author");
};

export const createBookService = (data) => {
  return Book.create(data);
};

export const updateBookService = (id, data) => {
  return Book.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteBookService = (id) => {
  return Book.findByIdAndDelete(id);
};
