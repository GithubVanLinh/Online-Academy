"use strict";
const mongoose = require("mongoose");
const Config = require("../configs/constraints");

const Lecturer = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  fullName: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
    default: Config.URL.DEFAULT_AVATAR
  },
  address: {
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
  status: {
    type: String,
    enum: [
      Config.ACCOUNT_STATUS.ACTIVE,
      Config.ACCOUNT_STATUS.DELETED
    ],
    default: Config.ACCOUNT_STATUS.PENDING
  },
  phone: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  teachingCourses: [
    {
      type: mongoose.Types.ObjectId,
      ref: Config.COLLECTION_NAME.COURSE
    }
  ],
  rfToken:{
    type: String,
    default: ""
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.LECTURER, Lecturer);
