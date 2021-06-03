"use strict";
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Config = require("../configs/constrainst");

const Course = new mongoose.Schema({
  courseName: {
    type: String,
    require: true
  },
  courseImage: {
    type: String,
    // default: "",
    require: true
  },
  courseLecturers: [
    {
      type: mongoose.Types.ObjectId,
      ref: Config.COLLECTION_NAME.LECTURER,
      require: true
    }
  ],
  category: {
    type: mongoose.Types.ObjectId,
    ref: Config.COLLECTION_NAME.CATEGORY,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  promotionalPrice: {
    type: Number,
    require: true
  },
  briefDescription: {
    type: String,
    default: ""
  },
  detailDescription: {
    type: String,
    default: ""
  },
  soldNumber: {
    type: Number,
    default: 0
  },
  ratedNumber: {
    type: Number,
    default: 0
  },
  lessionNumber: {
    type: Number,
    default: 0
  },
  totalHours: {
    type: Number,
    default: 0
  },
  ratingPoint: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: [
      Config.COURSE_STATUS.INCOMPLETE,
      Config.COURSE_STATUS.COMPLETED,
      Config.COURSE_STATUS.DELETED
    ],
    default: Config.COURSE_STATUS.INCOMPLETE
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  feedbacks: [
    {
      type: mongoose.Types.ObjectId,
      ref: Config.COLLECTION_NAME.FEEDBACK
    }
  ]
});
Course.plugin(mongoosePaginate);
module.exports = mongoose.model(Config.COLLECTION_NAME.COURSE, Course);
