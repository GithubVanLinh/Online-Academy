"use strict";

const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const adminModel = require("../models/administrator.model");

module.exports = {
  getAdminInfo: async (adminId) => {
    const admin = await adminModel.findById(adminId);
    return admin
  },
  logIn: async (loginInfo) => {
    const user = await adminModel.findOne({
      username: loginInfo.username
    }).exec();
    if (
      user === null ||
      !bcrypt.compareSync(loginInfo.password, user.password)
    ) {
      return {authenticated: false};
    }
    const payload = {
      userId: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      type: "admin"
    };
    const opts = {
      expiresIn: 10 * 60// seconds
    };
    const accessToken = jwt.sign(payload, process.env.NOT_A_SECRET_KEY, opts);
    const refreshToken = randomstring.generate(80);
    await adminModel.findByIdAndUpdate(user._id, {rfToken: refreshToken});
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
    const user = await isValidRfToken(userId, refreshToken);
    if (user) {
      const payload = {
        userId: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        type: "admin"
      };
      const opts = {
        expiresIn: 10 * 60// seconds
      };
      const newAccessToken = jwt.sign(
        payload,
        process.env.NOT_A_SECRET_KEY,
        opts
      );
      return {
        accessToken: newAccessToken
      };
    } else {
      return null;
    }
  }
};

/**
 * Check valid rfToken by userId
 * @param {string} userId userId
 * @param {string} refreshToken refreshToken
 * @return {bool}
 */
async function isValidRfToken(userId, refreshToken) {
  const user = await adminModel.findById(userId).exec();
  if (user.rfToken === refreshToken) {
    return user;
  } else {
    return null;
  }
}
