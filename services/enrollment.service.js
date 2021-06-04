"use strict";
const EnrollmentModel = require("../models/enrollment.model");

module.exports = {
  /**
   * 
   * @param {String} userId id of user
   * @param {String} courseId id of course
   */
  createEnrollment: async (userId, courseId) => {
    let enrollment;
    try {
      enrollment = await EnrollmentModel.findOneAndUpdate(
        {
          userId: userId,
          courseId: courseId
        },
        {},
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true
        }
      );
    } catch (error) {
      console.log(error);
    }
    return enrollment;
  }
}