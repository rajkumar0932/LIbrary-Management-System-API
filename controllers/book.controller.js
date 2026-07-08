import {
  getAllBooksService,
  getBookByIdService,
  createBookService,
  updateBookService,
  deleteBookService,
} from "../services/book.service.js";

export const getAllBooks = async (req, res, next) => {
  try {
    const result = await getAllBooksService(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const book = await getBookByIdService(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

export const createBook = async (req, res, next) => {
  try {
    const book = await createBookService(req.body);
    res.status(201).json({ message: "Book created successfully", book });
  } catch (err) {
    next(err);
  }
};

export const updateBook = async (req, res, next) => {
  try {
    const book = await updateBookService(req.params.id, req.body);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book updated successfully", book });
  } catch (err) {
    next(err);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await deleteBookService(req.params.id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (err) {
    next(err);
  }
};
