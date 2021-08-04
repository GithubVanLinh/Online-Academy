"use strict";
const categoryService = require("../services/category.service");
const CourseService = require("../services/course.service");
const Config = require("../configs/constraints");

module.exports = {
  reverseCategory: async (req, res, next) => {
    const { categoryId } = req.params;

    try {
      await categoryService.reverseCategory(categoryId);
      res.status(200).json({
        categoryId: categoryId
      });
    } catch (error) {
      res.status(400).json({
        error_message: "error when reverse"
      });
    }
  },
  getAllCategory: async (req, res) => {
    const result = {};
    try {
      const categories = await categoryService.getAllActiveCategory();

      result.web = categories.filter(
        (category) => category.level === Config.CATEGORY_LEVEL.WEB
      );
      result.mobile = categories.filter(
        (category) => category.level === Config.CATEGORY_LEVEL.MOBILE
      );
    } catch (error) {
      throw new Error(error);
    }
    res.json(result);
  },
  getCategories: async (req, res) => {
    const result = {};
    try {
      const categories = await categoryService.getAll();

      result.web = categories.filter(
        (category) => category.level === Config.CATEGORY_LEVEL.WEB
      );
      result.mobile = categories.filter(
        (category) => category.level === Config.CATEGORY_LEVEL.MOBILE
      );
    } catch (error) {
      throw new Error(error);
    }
    res.json(result);
  },
  getFeaturedCategories: async (req, res, next) => {
    const featuredCategories = await categoryService.getFeatured();
    res.json(featuredCategories);
  },

  getCategoryByCategoryId: async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const resl = await categoryService.getCategoryByCategoryId(categoryId);
    res.json(resl);
  },

  createCategory: async (req, res, next) => {
    const categoryInfo = req.body;

    const resl = await categoryService.createCategory(categoryInfo);
    if (resl) {
      res.json(resl);
    } else {
      res.status(400).json({
        message: "invalid request body"
      });
    }
  },

  deleteCategoryByCategoryId: async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const courses = await CourseService.getCoursesByCategory(categoryId);

    console.log("courses", courses.docs);
    if (courses && courses.docs && courses.docs.length > 0) {
      return res.status(400).json({
        error_message: "category have courses"
      });
    }
    const resl = categoryService.deleteCategoryByCategoryId(categoryId);

    if (resl) {
      res.status(200).json({
        message: "category has removed"
      });
    } else {
      res.status(500).json({
        error_message: "error when deleting"
      });
    }
  },

  updateCategoryByCategoryId: async (req, res, next) => {
    const categoryId = req.params.categoryId;
    const category = req.body;

    const resl = await categoryService.updateCategoryByCategoryId(
      categoryId,
      category
    );
    if (resl) {
      res.status(200).json(resl);
    } else {
      res.status(400).json({
        error_message: "update failed"
      });
    }
  }
};
