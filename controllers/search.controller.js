"use strict";
const searchService = require("../services/search.service");
module.exports = {
  getCourses: async (req, res, next) => {
    const filter = {};
    filter.keyword = req.query.keyword;
    const courses = await searchService.getCoursesByFilter(filter);
    res.json(courses);
  }
};
