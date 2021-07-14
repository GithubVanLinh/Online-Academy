"use strict";
const UserService = require("../services/user.service");

module.exports = {
  verifyUser: async (req, res, next) => {
    const { email, key } = req.body;
    const valid = await UserService.verifyUser(email, key);
    if (valid) {
      return res.status(200).json({
        message: "validate success"
      });
    } else {
      return res.status(400).json({
        error: "invalid info"
      });
    }
  },

  login: async (req, res, next) => {
    const loginInfo = req.body;
    const result = await UserService.logIn(loginInfo);
    if (!result) {
      return res.status(400).json({
        message: "Log in failed!"
      });
    } else {
      return res.json(result);
    }
  },

  refreshAcToken: async (req, res, next) => {
    const refreshInfo = req.body;
    const result = await UserService.refreshAccessToken(refreshInfo);
    if (!result) {
      return res.status(400).json({
        message: "Refresh token is revoked!"
      });
    } else {
      return res.json(result);
    }
  },

  logout: async (req,res) => {
    const logoutInfo = req.accessTokenPayload;
    console.log(logoutInfo);
    try {
      const result = await UserService.logOut(logoutInfo);
      if (!result) {
        return res.status(400).json({
          message: "Something wrong!"
        });
      } else {
        return res.json({
          message: "logged out"
        });
      }
    } catch (e) {
      console.log(e);
      return res.status(400);
    }
  }

};
