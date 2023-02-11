const Category = require("../models/categoryModel");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

// @desc   Create a new expense
// @route  /addcost
// @access Private
const addExpense = async (req, res) => {
  const { id, sum, category, day, month, year, description, user_id } =
    req.body;
  // Validation
  if (!id || !sum || !category || !month || !year || !day || !description) {
    res.status(400);
    throw new Error("Please include all fields.");
  }
  const currentUser = await User.find({ id: req.user.id });
  console.log(currentUser[0].id);

  //Create expense
  const expense = await Expense.create({
    id,
    sum,
    // user_id: currentUser[0].id,
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
      _id: id,
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
    throw new Error("Invalid user data.");
  }
};

// @desc   Get all current user's expenses for a specific month and a year
// @route  /report
// @access Public
const getAllExpenses = async (req, res) => {
  // const { month, year, user_id } = req.body;

  const year = req.query.year;
  const month = req.query.month;
  const currentUser = await User.find({ id: req.query.id * 1 });

  try {
    const docs = await Expense.find({
      month: month,
      year: year,
      user_id: currentUser[0]?.id,
    });

    if (!currentUser[0]) {
      res.status(404).json({
        status: "There is no such user.",
      });
      return;
    }

    if (docs.length === 0) {
      res.status(404).json({
        status: "There are no expenses in this account.",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: docs.length,
      data: {
        data: docs,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};
