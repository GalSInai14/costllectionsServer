const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addExpense,
  getAllExpenses,
} = require("../controllers/expenseController");

router.post("/addcost", protect, addExpense);
router.get("/report", protect, getAllExpenses);

module.exports = router;
