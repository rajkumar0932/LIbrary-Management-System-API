import {
  getAllAuthorsService,
  getAuthorByIdService,
  createAuthorService,
  updateAuthorService,
  deleteAuthorService,
} from "../services/author.service.js";

export const getAllAuthors = async (req, res, next) => {
  try {
    const result = await getAllAuthorsService(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getAuthorById = async (req, res, next) => {
  try {
    const author = await getAuthorByIdService(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json(author);
  } catch (err) {
    next(err);
  }
};

export const createAuthor = async (req, res, next) => {
  try {
    const author = await createAuthorService(req.body);
    res.status(201).json({ message: "Author created successfully", author });
  } catch (err) {
    next(err);
  }
};

export const updateAuthor = async (req, res, next) => {
  try {
    const author = await updateAuthorService(req.params.id, req.body);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author updated successfully", author });
  } catch (err) {
    next(err);
  }
};

export const deleteAuthor = async (req, res, next) => {
  try {
    const author = await deleteAuthorService(req.params.id);
    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (err) {
    next(err);
  }
};
