const express = require("express");
const router = express.Router();
const User = require("../models/User");

// create user
router.post("/add", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// get users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;