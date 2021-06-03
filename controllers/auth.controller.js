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

  login: async (req,res,next)=>{
    const loginInfo = req.body;
    const result = await UserService.logIn(loginInfo);
    if(!result){
      return res.status(400).json({
        message: "log in failed"
      })
    } else {
      return res.json(result);
    }
  }

};
