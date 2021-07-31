"use strict";
const searchService = require("../services/search.service");
module.exports = {
  getCoursesByName: async (req, res, next) => {
    const filter = {};
    filter.keyword = req.query.keyword;
    filter.page = +req.query.page || 1;
    filter.sortBy = req.query.sortBy;
    const courses = await searchService.getCoursesByFilter(filter);
    res.json(courses);
  },

  getCoursesByCategory: async (req, res, next) => {
    const filter = {};
    filter.keyword = req.query.keyword;
    filter.page = +req.query.page || 1;
    filter.sortBy = req.query.sortBy;
    const courses = await searchService.getCoursesByCate(filter);
    res.json(courses);
  },

  getCategoryByName: async (req, res) => {
    const keyword = req.query.keyword;
    const category = await searchService.getCategoryByName(keyword);
    if (category) {
      return res.json(category);
    } else {
      return res.status(204).json();
    }
  }
};
