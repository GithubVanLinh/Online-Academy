"use strict";
const mongoose = require("mongoose");
const Config = require("../configs/constraints");

const User = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  fullName: {
    type: String,
    require: true
  },
  rfToken:{
    type: String,
    default: ""
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.USER, User);
