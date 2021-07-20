"use strict";

const AdminModel = require("../models/administrator.model");

module.exports = {
  getAdminInfo: async (adminId) => {
    const admin = await AdminModel.findById(adminId);
    return admin
  }
};
