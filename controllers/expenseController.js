const Category = require("../models/categoryModel");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const crypto = require("crypto");

//Categories for the formatted returned document
const categories = [
  "food",
  "health",
  "housing",
  "sport",
  "education",
  "transportation",
  "other",
];

// @desc   Create a new expense
// @route  /addcost
// @access Public

const addExpense = async (req, res) => {
  const { sum, category, day, month, year, description, user_id } = req.body;
  // Validation
  if (!sum || !category || !month || !year || !day || !description) {
    res.status(400);
    throw new Error("Please include all fields.");
  }
  const currentUser = await User.find({ id: user_id });

  if (!currentUser[0]?.id) {
    throw new Error("There is no such account.");
  }

  //Generating a random id for the new expense
  const expense_id = crypto.randomBytes(8).toString("hex");

  //Create expense
  const expense = await Expense.create({
    id: expense_id,
    sum,
    user_id,
    category: new Category({
      name: category,
    }),
    day,
    month,
    year,
    description,
  });

  if (expense) {
    res.status(201).json({
      _id: expense_id,
      user_id: expense.user_id,
      sum: expense.sum,
      category: expense.category,
      day: expense.day,
      month: expense.month,
      year: expense.year,
      description: expense.description,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data.");
  }
};

// @desc   Get all current user's expenses for a specific month and a year
// @route  /report
// @access Public
const getAllExpenses = async (req, res) => {
  //get month year and the current user from the query params

  const year = req.query.year;
  const month = req.query.month;
  const currentUser = await User.find({ id: req.query.id * 1 });

  try {
    // Find the documents in mongodb db
    const docs = await Expense.find({
      month: month,
      year: year,
      user_id: currentUser[0]?.id,
    });

    //Checking if there is any user with the current user data

    if (!currentUser[0]) {
      res.status(404).json({
        status: "There is no such user.",
      });
      return;
    }

    //Checking if there are any expenses for the current user
    if (docs.length === 0) {
      res.status(404).json({
        status: "There are no expenses in this account.",
      });
      return;
    }

    // The returned document
    res.status(200).json(
      categories.reduce((result, category) => {
        result[category] = docs
          .filter((doc) => doc.category?.name === category)
          .map((doc) => ({
            day: doc.day,
            description: doc.description,
            sum: doc.sum,
          }));
        return result;
      }, {})
    );
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};
