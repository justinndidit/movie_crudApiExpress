const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to DB successfully!");
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

module.exports = dbConnect;
