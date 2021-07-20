"use strict";

const AdminService = require("../services/administrator.service");

module.exports = {
  getAdminInfo: async (req, res, next) => {

    try {
    const admin = await AdminService.getAdminInfo(req.admin.id);
    res.status(200).json(admin)
    } catch (e) {
      res.status(400).json({
        message: e
      })
    }

  }
}