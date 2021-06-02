"use strict";
const mongoose = require("mongoose");

const Config = require("../configs/constrainst");

const Category = new mongoose.Schema({
  categoryName: {
    type: String,
    require: true
  },
  level: {
    type: String,
    enum: [
      Config.CATEGORY_LEVEL.WEB,
      Config.CATEGORY_LEVEL.MOBILE
    ],
    require: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.CATEGORY, Category);
