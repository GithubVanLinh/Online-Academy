const mongoose = require("mongoose");
const Config = require("../configs/constrainst");

const Feedback = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    require: true
  },
  content: {
    type: String,
    require: true
  },
  ratingPoint: {
    type: Number,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(Config.COLLECTION_NAME.FEEDBACK, Feedback);