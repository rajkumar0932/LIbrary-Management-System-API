import {
  registerUserService,
  loginUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} from "../services/user.service.js";
import { generateToken } from "../utils/generateToken.js";

// register a new user
export const registerUser = async (req, res, next) => {
  try {
    const user = await registerUserService(req.body);
    const token = generateToken({ id: user._id, role: user.role });
    res.status(201).json({ message: "User registered successfully", user, token });
  } catch (err) {
    next(err);
  }
};

// login user and give back a token
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await loginUserService(email, password);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ id: user._id, role: user.role });
    res.status(200).json({ message: "Login successful", user, token });
  } catch (err) {
    next(err);
  }
};

// get all users (pagination + filters)
export const getAllUsers = async (req, res, next) => {
  try {
    const result = await getAllUsersService(req.query);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await getUserByIdService(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//update user
export const updateUser = async (req, res, next) => {
  try {
    const user = await updateUserService(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await deleteUserService(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// upload profile picture for the logged in user
export const uploadProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const profilePicture = `/uploads/profiles/${req.file.filename}`;
    const user = await updateUserService(req.user.id, { profilePicture });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile picture uploaded successfully", user });
  } catch (err) {
    next(err);
  }
};
