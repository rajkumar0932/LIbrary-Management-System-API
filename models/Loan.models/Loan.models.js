import mongoose from "mongoose";

// loan model - tracks who borrowed which book and if its back yet
const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // the person borrowing
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    loanDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, "due date is required"],
    },
    returnedDate: {
      type: Date,
      default: null, // stays null until the book comes back
    },
    status: {
      type: String,
      enum: ["active", "returned", "overdue"],
      default: "active",
    },
  },
  { timestamps: true },
);

export const Loan = mongoose.model("Loan", loanSchema);
