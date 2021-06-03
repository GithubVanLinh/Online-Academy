"use strict";
const categoryService = require("../services/category.service");
const Config = require("../configs/constrainst");

module.exports = {
  getAllCategory: async (req, res) => {
    const result = {};
    try {
      const categories = await categoryService.getAll();

      result.web = categories.filter((category) => category.level === Config.CATEGORY_LEVEL.WEB);
      result.mobile = categories.filter((category) => category.level === Config.CATEGORY_LEVEL.MOBILE);
    } catch (error) {
      throw new Error(error);
    }
    res.json(result);
  },
  getFeaturedCategories: async (req, res, next) => {
    const featuredCategories = await categoryService.getFeatured();
    res.json(featuredCategories);
  }
};
