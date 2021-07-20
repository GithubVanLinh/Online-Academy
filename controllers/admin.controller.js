"use strict";

const adminService = require("../services/administrator.service");

module.exports = {
  // getAdminInfo: async (req, res, next) => {
  //   try {
  //   const admin = await adminService.getAdminInfo(req.admin.id);
  //   res.status(200).json(admin)
  //   } catch (e) {
  //     res.status(400).json({
  //       message: e
  //     })
  //   }
  // },
  getAdminInfo: async (req, res) => {
    try {
      const admin = await adminService.getAdminInfo(req.params.id);
      res.status(200).json(admin);
    } catch (e) {
      console.log(e);
      res.status(400).json({
        error_message: "something broke"
      })
    }
  },
  login: async (req, res) => {
    const loginInfo = req.body;
    const result = await adminService.logIn(loginInfo);
    if (!result) {
      return res.status(400).json({
        message: "Log in failed!"
      });
    } else {
      return res.json(result);
    }
  }
}
