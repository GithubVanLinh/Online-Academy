"use strict";
const mongoose = require("mongoose");
const Config = require("../configs/constrainst");

const Enrollment = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  registeredTime: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.ENROLLMENT, Enrollment);
