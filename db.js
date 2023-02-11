const colors = require("colors");
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const url =
      "mongodb+srv://CostllectionUser:user1234@costllectionscluster.o7cimbq.mongodb.net/?retryWrites=true&w=majority";
    const conn = await mongoose.connect(url);
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch (err) {
    console.log(`Error: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

module.exports = connectDB;
