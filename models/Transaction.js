const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  amount: Number,
  type: String,
  category: String,
  date: Date
});

module.exports = mongoose.model("Transaction", transactionSchema);