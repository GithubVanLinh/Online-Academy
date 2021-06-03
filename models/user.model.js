"use strict";
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  avatar: String,
  phone: String,
  status: String,
  createdAt: Date,
  updatedAt: Date,
  address: String,
  fullName: String
});

module.exports = mongoose.model("User", User);
