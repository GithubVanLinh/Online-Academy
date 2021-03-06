"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const ImgUtil = require("../utils/ImgUtil");
const fs = require("fs");

const VerifyService = require("../services/verify.service");
const LecturerModel = require("../models/lecturer.model");
const Config = require("../configs/constraints");

const salt = bcrypt.genSaltSync(10);

module.exports = {
  reverseLecturer: async (id) => {
    return await LecturerModel.findByIdAndUpdate(id, { status: "ACTIVE" });
  },
  logIn: async (loginInfo) => {
    const lecturer = await LecturerModel.findOne({
      username: loginInfo.username
    }).exec();
    if (
      lecturer === null ||
      !bcrypt.compareSync(loginInfo.password, lecturer.password)
    ) {
      return { authenticated: false };
    }
    const payload = {
      userId: lecturer._id,
      username: lecturer.username,
      fullName: lecturer.fullName,
      email: lecturer.email,
      avatar: lecturer.avatar,
      type: "lecturer"
    };
    const opts = {
      expiresIn: 10 * 60 // seconds
    };
    const accessToken = jwt.sign(payload, process.env.NOT_A_SECRET_KEY, opts);
    const refreshToken = randomstring.generate(80);
    await LecturerModel.findByIdAndUpdate(lecturer._id, {
      rfToken: refreshToken
    });
    return {
      authenticated: true,
      accessToken,
      refreshToken
    };
  },

  refreshAccessToken: async (refreshInfo) => {
    const { accessToken, refreshToken } = refreshInfo;
    const { userId } = jwt.verify(accessToken, process.env.NOT_A_SECRET_KEY, {
      ignoreExpiration: true
    });
    const lecturer = await isValidRfToken(userId, refreshToken);
    if (lecturer) {
      const payload = {
        userId: lecturer._id,
        username: lecturer.username,
        fullName: lecturer.fullName,
        email: lecturer.email,
        avatar: lecturer.avatar,
        type: "lecturer"
      };
      const opts = {
        expiresIn: 10 * 60 // seconds
      };
      const newAccessToken = jwt.sign(
        payload,
        process.env.NOT_A_SECRET_KEY,
        opts
      );
      return {
        accessToken: newAccessToken
      };
    }
    return null;
  },

  getTeachingCourses: async (lecturerId) => {
    const lecturer = await LecturerModel.findById(lecturerId)
      .select("teachingCourses")
      .populate({
        path: "teachingCourses",
        populate: { path: "teachingCourses" }
      });
    return lecturer.teachingCourses;
  },

  changeLecturerAvatar: async (lecturerId, imgFilePath) => {
    const newAvatarUrl = await ImgUtil.getNewFileUrl(imgFilePath);
    fs.unlinkSync(imgFilePath);
    const result = LecturerModel.findByIdAndUpdate(
      lecturerId,
      { avatar: newAvatarUrl, updatedAt: Date.now() },
      { new: true }
    ).select("avatar");
    return result;
  },

  removeCourseFromTeachingCoursesForAllLecturer: async (courseId) => {
    return await mRemoveCourseFromTeachingCoursesForAllLecturer(courseId);
  },

  findById: async (lecturerId) => {
    let lecturer = null;
    try {
      lecturer = await LecturerModel.findById(lecturerId).exec();
    } catch (error) {
      console.error(error);
    }
    return lecturer;
  },

  findAndUpdate: async (lecturerId, newInfo) => {
    let lecturer = null;
    try {
      const query = {
        _id: lecturerId,
        status: Config.ACCOUNT_STATUS.ACTIVE
      };
      const update = {
        ...newInfo,
        updatedAt: Date.now()
      };
      const option = {
        new: true
      };
      lecturer = await LecturerModel.findOneAndUpdate(query, update, option)
        .select([...Object.keys(newInfo), "updatedAt"])
        .exec();
    } catch (error) {
      console.error(error);
    }
    return lecturer;
  },

  updatePassword: async (lecturerId, newPassword) => {
    try {
      const hashPassword = await bcrypt.hash(newPassword, salt);
      return await LecturerModel.findOneAndUpdate(
        { _id: lecturerId },
        { password: hashPassword, updatedAt: Date.now() },
        { new: true }
      ).select(["username", "password", "updatedAt"]);
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   *
   * @param {string} newEmail
   * @return {object}
   */
  makeChangeEmailVerification: async (newEmail) => {
    try {
      const isValidEmail = await checkEmailExists(newEmail);
      if (isValidEmail) {
        const verification = await VerifyService.createNewValidateRequestV2(
          newEmail
        );
        return verification;
      }
      return null;
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   *
   * @param {string} lecturerId
   * @param {string} email
   * @param {string} key
   * @return {object}
   */
  verifyEmail: async (lecturerId, email, key) => {
    let lecturer = null;
    try {
      const result = await VerifyService.validateUser(email, key);
      if (result === true) {
        lecturer = await LecturerModel.findOneAndUpdate(
          { _id: lecturerId },
          { email: email, updatedAt: Date.now() },
          { new: true }
        ).select(["email", "updatedAt"]);
      }
    } catch (error) {
      throw Error(error);
    }
    return lecturer;
  },

  addCourseToTeachingCourses: async (lecturerId, courseId) => {
    try {
      const lecturer = await LecturerModel.findByIdAndUpdate(lecturerId, {
        $addToSet: { teachingCourses: courseId }
      });
      return lecturer;
    } catch (e) {
      console.log(e);
      return null;
    }
  },

  getAllLecturer: async () => {
    const resl = await LecturerModel.find({}).populate("teachingCourses");
    return resl;
  },

  // lecterer has valid
  createLecturer: async (lecturer) => {
    const newpass = bcrypt.hashSync(lecturer.password, salt);
    const newLec = { ...lecturer, password: newpass };
    return await LecturerModel.create(newLec);
  },
  mCheckUsernameExist,
  mCheckEmailExist,
  mUpdateLecturerToDelete,

  checkTeachingCourse: async (lecturerId, courseId) => {
    try {
      const lecturer = await LecturerModel.findById(lecturerId);
      if (lecturer) {
        const course = lecturer.teachingCourses.find((id) => id === courseId);
        if (course) {
          return true;
        }
      }
      return lecturer;
    } catch (e) {
      console.log(e);
    }
    return false;
  }
};

/**
 * Check valid rfToken by userId
 * @param {string} userId userId
 * @param {string} refreshToken refreshToken
 * @return {bool}
 */
async function isValidRfToken(userId, refreshToken) {
  const user = await LecturerModel.findById(userId).exec();
  if (user.rfToken === refreshToken) {
    return user;
  } else {
    return null;
  }
}

/**
 * Delete course
 * @param {string} courseId id of course
 * @return {Promise<number>} number course in lecturer is deleted
 */
async function mRemoveCourseFromTeachingCoursesForAllLecturer(courseId) {
  const lecturers = await LecturerModel.find({
    teachingCourses: { _id: courseId }
  });

  for (let index = 0; index < lecturers.length; index++) {
    await mDeleteCourseFromTeachingCourses(lecturers[index]._id, courseId);
  }

  return lecturers.length;
}

/**
 *
 * @param {string} lecturerId lecturerID
 * @param {string} courseId courseId
 * @return {object}
 */
async function mDeleteCourseFromTeachingCourses(lecturerId, courseId) {
  const teachingCourses = await mGetListTechingCourses(lecturerId);
  const pos = teachingCourses.indexOf(courseId);
  if (pos > -1) {
    console.log("pos", pos);
    teachingCourses.splice(pos, 1);
    const res = await LecturerModel.findByIdAndUpdate(lecturerId, {
      teachingCourses: teachingCourses
    });
    return res;
  } else {
    return null;
  }
}

/**
 * Get list teaching course of lecturer
 * @param {string} lecturerId id
 * @return {Promise<Array<object>>}
 */
async function mGetListTechingCourses(lecturerId) {
  const res = await LecturerModel.findById(lecturerId);
  return res.teachingCourses;
}

/**
 *
 * @param {String} email
 * @return {bool}
 */
async function checkEmailExists(email) {
  try {
    const result = await LecturerModel.findOne({ email: email }).exec();
    if (!result) {
      return true;
    }
  } catch (error) {
    throw Error(error);
  }
  return false;
}

/**
 * check if username exists will return true
 * @param {string} username string username
 * @return {bool}
 */
async function mCheckUsernameExist(username) {
  const res = await LecturerModel.find({ username: username });
  if (res && res.length > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * check if email exists will return true
 * @param {string} email string email
 * @return {bool}
 */
async function mCheckEmailExist(email) {
  const res = await LecturerModel.find({ email: email });
  if (res && res.length > 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * delete lecturer
 * @param {string} lecturerId lecturer id
 * @return {Promise<number>}
 */
async function mUpdateLecturerToDelete(lecturerId) {
  const res = await LecturerModel.findByIdAndUpdate(lecturerId, {
    status: "DELETED"
  });
  return res;
}
