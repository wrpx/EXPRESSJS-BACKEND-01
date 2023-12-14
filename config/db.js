//db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/product");
    console.log("DB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error.message);
  }
};

module.exports = connectDB;
