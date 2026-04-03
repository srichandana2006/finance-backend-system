const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: {
    type: String,
    enum: ["admin", "analyst", "viewer"],
    default: "viewer"
  }
});

module.exports = mongoose.model("User", userSchema);