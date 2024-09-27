const mongoose = require("mongoose");
require("dotenv").config();

exports.initializeMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    mongoose.set("strictQuery", true);
    console.log("🛢️  DATABASE CONNECTED");
  } catch (err) {
    console.log("DATABASE CONNECTION ERROR");
    console.log(err);
  }
};
