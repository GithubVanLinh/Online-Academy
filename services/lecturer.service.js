"use strict";
const bcrypt = require("bcryptjs");
const LecturerModel = require("../models/lecturer.model")
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");


// const salt = bcrypt.genSaltSync(10);

module.exports = {
  logIn: async (loginInfo) => {
    const lecturer = await LecturerModel.findOne({ username: loginInfo.username }).exec();
    if ((lecturer === null) || !bcrypt.compareSync(loginInfo.password, lecturer.password)) {
      return { authenticated: false };
    }
    const payload = {
      userId: lecturer._id
    };
    const opts = {
      expiresIn: 10 * 60 // seconds
    };
    const accessToken = jwt.sign(payload, process.env.NOT_A_SECRET_KEY, opts);

    const refreshToken = randomstring.generate(80);
    await LecturerModel.findByIdAndUpdate(lecturer._id, { rfToken: refreshToken });
    return {
      authenticated: true,
      accessToken,
      refreshToken
    };
  },

  refreshAccessToken: async (refreshInfo) => {
    const { accessToken, refreshToken } = refreshInfo;
    const { userId } = jwt.verify(accessToken, process.env.NOT_A_SECRET_KEY, {
      ignoreExpiration: true
    });
    const valid = await isValidRfToken(userId, refreshToken);
    if (valid === true) {
      const newAccessToken = jwt.sign({ userId }, process.env.NOT_A_SECRET_KEY, { expiresIn: 60 * 10 });
      return {
        accessToken: newAccessToken
      };
    }
    return null;
  }
}


/**
 * Check valid rfToken by userId
 * @param {string} userId userId
 * @param {string} refreshToken refreshToken
 * @return {bool}
 */
async function isValidRfToken(userId, refreshToken) {
  const user = await LecturerModel.findById(userId).exec();
  if (user.rfToken === refreshToken) {
    return true;
  } else {
    return false;
  }
}
