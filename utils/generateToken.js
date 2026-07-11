import jwt from "jsonwebtoken";

// sign a token that lasts 7 days
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};
