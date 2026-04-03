const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
const connectDB = require("./config/db");
connectDB();
const transactionRoutes = require("./routes/transactionRoutes");
app.use("/transactions", transactionRoutes);
const userRoutes = require("./routes/userRoutes");
app.use("/users", userRoutes);