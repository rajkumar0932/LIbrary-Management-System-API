import bcrypt from "bcrypt";
import { User } from "../models/User.models/User.models.js";

export const registerUserService = (data) => {
  return User.create(data);
};

// find the user by email and verify password
export const loginUserService = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) return null;

  const match = await user.matchPassword(password);
  if (!match) return null;

  return user;
};

export const getAllUsersService = async (query) => {
  const { name, email, role, page = 1, limit = 10 } = query;

  const filter = {};
  if (name) filter.name = { $regex: name, $options: "i" };
  if (email) filter.email = { $regex: email, $options: "i" };
  if (role) filter.role = role;

  const pageNum = Math.max(parseInt(page) || 1, 1);
  const limitNum = Math.max(parseInt(limit) || 10, 1);
  const skip = (pageNum - 1) * limitNum;

  const [data, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    User.countDocuments(filter),
  ]);

  return { data, total, page: pageNum, totalPages: Math.ceil(total / limitNum) };
};

export const getUserByIdService = (id) => {
  return User.findById(id);
};

export const updateUserService = async (id, data) => {
  // hash new password if it is being changed
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return User.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
};

export const deleteUserService = (id) => {
  return User.findByIdAndDelete(id);
};
