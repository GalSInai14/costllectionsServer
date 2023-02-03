const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addExpense,
  getAllExpenses,
  getMonthlyExpenses,
  getYearlyExpenses,
} = require("../controllers/expenseController");

router.post("/addcost", protect, addExpense);
router.get("/report/all-expenses", protect, getAllExpenses);
router.get("/report/month", protect, getMonthlyExpenses);
router.get("/report/year", protect, getYearlyExpenses);

module.exports = router;
