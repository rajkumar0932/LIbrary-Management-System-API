import mongoose from "mongoose";

// connect to mongodb. server.js awaits this and exits if it throws
export const dbConnect = async () => {
  const conn = await mongoose.connect(process.env.DATABASE_URL);
  console.log(`MongoDB connected: ${conn.connection.host}`);
};
