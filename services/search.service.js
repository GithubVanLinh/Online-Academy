// "use strict";
const CourseModel = require("../models/course.model");

module.exports = {
  getCoursesByFilter: async (filter) => {
    let query = {};
    // query.show = true;
    if (filter.keyword) {
      const keyword = filter.keyword;
      query.courseName = new RegExp(keyword, "gi");
    }
    let options ={};
    let courses=[];
    try{
      const result = await CourseModel.paginate(query, options);
      courses = [...result.docs];
    } catch (error){
      console.log(error);
      throw new Error(error);
    }
    return courses;
  }
};
