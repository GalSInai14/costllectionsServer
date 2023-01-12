const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true],
    },
    user_id: {
      type: String,
    },

    day: { type: String },
    month: { type: String },
    year: { type: String },

    description: { type: String },
    category: {
      type: String,
      enum: [
        "food",
        "health",
        "housing",
        "sport",
        "education",
        "transportation",
        "other",
      ],
    },
    sum: {
      type: Number,
    },
  },

  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
