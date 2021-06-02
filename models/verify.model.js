"use strict";
const mongoose = require("mongoose");

const Verify = new mongoose.Schema({
  email: String,
  key: String
});

module.exports = mongoose.model("verify", Verify);
