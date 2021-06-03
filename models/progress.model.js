"use strict";
const mongoose = require("mongoose");
const Config = require("../configs/constraints");

const Progress = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: Config.COLLECTION_NAME.USER,
    require: true
  },
  lessonId: {
    type: mongoose.Types.ObjectId,
    ref: Config.COLLECTION_NAME.LESSON,
    require: true
  },
  isFinish: {
    type: Boolean,
    default: false
  },
  progress: {
    type: Number,
    require: true
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.PROGRESS, Progress);
