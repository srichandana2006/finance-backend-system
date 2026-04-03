const checkRole = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");

// Add transaction
router.post("/add", checkRole(["admin"]), async (req, res) => {
  try {
    const { amount, type, category, date } = req.body;

    // validation
    if (!amount || !type || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const data = await Transaction.create(req.body);
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all
router.get("/", async (req, res) => {
  try {
    const { category, type } = req.query;

    let filter = {};

    if (category) filter.category = category;
    if (type) filter.type = type;

    const data = await Transaction.find(filter);
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get("/summary", async (req, res) => {
  const data = await Transaction.find();

  let income = 0;
  let expense = 0;

  data.forEach(t => {
    if (t.type === "income") income += t.amount;
    else expense += t.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    balance: income - expense
  });
});
router.get("/insights", async (req, res) => {
  const data = await Transaction.find();

  let expense = 0;

  data.forEach(t => {
    if (t.type === "expense") expense += t.amount;
  });

  let message = "Spending is under control";

  if (expense > 5000) {
    message = "High spending detected!";
  }

  res.json({ insight: message });
});

module.exports = router;
