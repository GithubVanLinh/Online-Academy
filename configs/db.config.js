"use strict";
const mongoose = require("mongoose");

const url = (process.env.NODE_ENV != "test")?process.env.MONGODB_URL:process.env.TEST_MONGODB_URL

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  // we're connected!
  console.log("Connect database successfully!");
});

module.exports = db;
