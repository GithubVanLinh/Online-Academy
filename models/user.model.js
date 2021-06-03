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
  avatar: {
    type: String,
    default: Config.URL.DEFAULT_AVATAR
  },
  phone: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: [
      Config.ACCOUNT_STATUS.PENDING,
      Config.ACCOUNT_STATUS.ACTIVE,
      Config.ACCOUNT_STATUS.DELETED
    ],
    default: Config.ACCOUNT_STATUS.PENDING
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  address: {
    type: String,
    default: ""
  },
  fullName: {
    type: String,
    require: true
  },
  wishList: [
    {
      type: mongoose.Types.ObjectId,
      ref: Config.COLLECTION_NAME.COURSE
    }
  ],
  registeredList: [
    {
      courseId: {
        type: mongoose.Types.ObjectId,
        ref: Config.COLLECTION_NAME.COURSE
      },
      registeredTime: Date
    }
  ]
});

module.exports = mongoose.model(Config.COLLECTION_NAME.USER, User);
