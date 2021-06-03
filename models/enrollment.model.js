"use strict";
const mongoose = require("mongoose");
const Config = require("../configs/constraints");

const Enrollment = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: Config.COLLECTION_NAME.USER,
    require: true
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: Config.COLLECTION_NAME.COURSE,
    require: true
  },
  registeredTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.ENROLLMENT, Enrollment);
