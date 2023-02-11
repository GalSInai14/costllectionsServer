const mongoose = require("mongoose");
const Category = require("./categoryModel").schema;

const expenseSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    user_id: {
      required: [true, "Please add the user id."],
      type: String,
    },

    category: {
      type: Category,
      required: [true, "Please add the category name."],
    },

    day: {
      type: String,
      required: [true, "Please add the exact day of the purchase.."],
    },
    month: {
      type: String,
      required: [true, "Please add the exact month of the purchase."],
    },
    year: {
      type: String,
      require: [true, "Please add the year of the purchase."],
    },

    description: { type: String, required: [true, "Please add a description"] },

    sum: {
      type: Number,
      required: [true, "Please add the sum of the purchase."],
    },
  },

  {
    timestamps: true,
  }
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;
