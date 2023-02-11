const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./db");
const mongoose = require("mongoose");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

app.use("/", require("./routes/expenseRoute"));
app.get("/about", (req, res) => {
  const developers = [
    {
      firstName: "Gal",
      lastName: "Sinai",
      id: 206846743,
      email: "galsinai33@gmail.com",
    },
    {
      firstName: "Ron",
      lastName: "Ashkenazi",
      id: 206616666,
      email: "ron98002@gmail.com",
    },
  ];
  res.json(developers);
});

app.listen(port, () => console.log("Backend server live on port " + port));

module.exports = app;
