"use strict";
const mongoose = require("mongoose");
const Config = require("../configs/constrainst");

const Lesson = new mongoose.Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: Config.COLLECTION_NAME.COURSE,
    require: true
  },
  sectionId: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  totalLength: {
    type: Number,
    require: true
  },
  videoUrl: {
    type: String,
    require: true
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.LESSON, Lesson);
