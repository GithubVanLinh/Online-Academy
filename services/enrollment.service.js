"use strict";
const EnrollmentModel = require("../models/enrollment.model");
const CourseService = require("../services/course.service");

module.exports = {
  /**
   *
   * @param {String} userId id of user
   * @param {String} courseId id of course
   */
  didUserRegisterCourse: async (userId, courseId) => {
    let result = null;
    try {
      result = await EnrollmentModel.findOne({
        userId: userId,
        courseId: courseId
      }).exec();
    } catch (error) {
      console.log(error);
    }
    return result;
  },

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
      await CourseService.increaseSoldNumber(courseId, 1);
    } catch (error) {
      console.log(error);
    }
    return enrollment;
  },

  deleteEnrollmentByEnrollmentId: async (enrollId) => {
    const res = await mDeleteEnrollment(enrollId);
    return res;
  },

  deleteEnrollmentByCourseId: async (courseId) => {
    return await mDeleteEnrollHaveCourse(courseId);
  },
  mDeleteEnrollmentsByUserId
};

/**
 * delete enrollment in database
 * @param {string} enrollmentId in
 */
async function mDeleteEnrollment(enrollmentId) {
  const res = await EnrollmentModel.findByIdAndDelete(enrollmentId);
  return res;
}

/**
 * get enrolls contain list
 * @param {string} courseId course id
 * @return {Promise<Array<object>>}
 */
async function mGetListEnrollmentHaveCourse(courseId) {
  const enrolls = await EnrollmentModel.find({
    courseId: courseId
  });

  return enrolls;
}

/**
 * delete multiple enroll
 * @param {string} courseId id
 * @return {Promise<number>}
 */
async function mDeleteEnrollHaveCourse(courseId) {
  const enrolls = await mGetListEnrollmentHaveCourse(courseId);
  await enrolls.map(async (enroll) => {
    await mDeleteEnrollment(enroll._id);
  });
  return enrolls.length;
}

/**
 * delete enrollment
 * @param {string} userId userId
 * @return {Promise<number>}
 */
async function mDeleteEnrollmentsByUserId(userId) {
  const filter = {
    userId: userId
  };
  const res = await EnrollmentModel.deleteMany(filter);
  return res;
}
