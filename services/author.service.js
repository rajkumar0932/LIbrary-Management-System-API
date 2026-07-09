import { Author } from "../models/Author.models/Author.models.js";

export const getAllAuthorsService = async (query) => {
  const { name, nationality, page = 1, limit = 10 } = query;

  const filter = {};
  if (name) filter.name = { $regex: name, $options: "i" };
  if (nationality) filter.nationality = { $regex: nationality, $options: "i" };

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    Author.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Author.countDocuments(filter),
  ]);

  return {
    data,
    total,
    page: pageNum,
    totalPages: Math.ceil(total / limitNum),
  };
};

export const getAuthorByIdService = (id) => {
  return Author.findById(id);
};

export const createAuthorService = (data) => {
  return Author.create(data);
};

export const updateAuthorService = (id, data) => {
  return Author.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteAuthorService = (id) => {
  return Author.findByIdAndDelete(id);
};
