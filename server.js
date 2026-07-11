import express from "express";
import "dotenv/config";
import { dbConnect } from "./config/dbConnect.js";
import bookRoutes from "./routes/book.routes.js";
import authorRoutes from "./routes/author.routes.js";
import userRoutes from "./routes/user.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use("/uploads", express.static("uploads")); // to access uploaded images

// connect db
dbConnect().catch((err) => {
  console.error("DB connection failed:", err.message);
  process.exit(1);
});

app.get("/", (req, res) => {
  res.json({ message: "Library Management System API is running" });
});

// routes
app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
