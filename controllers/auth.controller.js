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
  }
};
