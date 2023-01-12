const Expense = require("../models/expenseModel");
const User = require("../models/userModel");

// @desc   Create a new expense
// @route  /addcost
// @access Private
const addExpense = async (req, res) => {
  const { id, sum, category, day, month, year, description } = req.body;
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
    user_id: currentUser[0].id,
    category,
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
// @access Private
const getAllExpenses = async (req, res) => {
  const { month, year } = req.body;
  const currentUser = await User.find({ id: req.user.id });

  try {
    const docs = await Expense.find({
      month: month,
      year: year,
      user_id: currentUser[0].id,
    });

    if (docs.length === 0) {
      res.status(404).json({
        status: "There are no expenses in this account.",
      });
      throw new Error("There are no expenses in this account.");
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
    throw new Error("Could not get all expenses");
  }
};

module.exports = {
  addExpense,
  getAllExpenses,
};
