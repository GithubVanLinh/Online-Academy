"use strict";
const mongoose = require("mongoose");
const Config = require("../configs/constraints");

const Section = new mongoose.Schema({
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: Config.COLLECTION_NAME.COURSE,
    require: true
  },
  title: {
    type: String,
    require: true
  },
  totalLength: { // ae coi thu co can totalLength cho section ko???
    type: Number,
    defautl: 0
  },
  order: {
    type: Number,
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
  isDeleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.SECTION, Section);
