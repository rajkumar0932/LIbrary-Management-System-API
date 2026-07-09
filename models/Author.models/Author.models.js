import mongoose from "mongoose";
const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "author name is required"],
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    nationality: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    website: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
export const Author = mongoose.model("Author", authorSchema);
