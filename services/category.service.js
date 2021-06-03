"use strict";
const categoryModel = require("../models/category.model");

module.exports = {
  /**
   *
   * @return {Array} list category
   */
  getAll: async () => {
    return await categoryModel.find({});
  },

  getCategoryByCategoryId: async (categoryId) => {
    return await categoryModel.findById(categoryId);
  }
};
