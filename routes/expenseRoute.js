const express = require("express");
const router = express.Router();

const {
  addExpense,
  getAllExpenses,
} = require("../controllers/expenseController");

router.post("/addcost", addExpense);
router.get("/report", getAllExpenses);

module.exports = router;
