// const jwt = require("jsonwebtoken");
"use strict";
const bcrypt = require("bcryptjs");

const ajv = require("../configs/ajv.config");

const UserModel = require("../models/user.model");
const LecturerModel = require("../models/lecturer.model");
const AdminModel = require("../models/administrator.model");
const CourseModel = require("../models/course.model");
const EnrollmentModel = require("../models/enrollment.model");
const Config = require("../configs/constraints");
const CONST = require("../models/constraint");
const VerifyService = require("./verify.service");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const ImgUtil = require("../utils/ImgUtil");
const fs = require("fs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
  /**
   *
   * @param {String} password text password
   * @param {String} hashPassword hash password
   * @return {Boolean} true or false
   */
  verifyPassword: async (password, hashPassword) => {
    try {
      return await bcrypt.compare(password, hashPassword);
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  updatePassword: async (userId, newPassword) => {
    try {
      const hashPassword = await bcrypt.hash(newPassword, salt);
      return await UserModel.findOneAndUpdate(
        { _id: userId },
        { password: hashPassword, updatedAt: Date.now() },
        { new: true }
      ).select(["username", "password"]);
    } catch (error) {
      throw Error(error);
    }
  },

  /**
   *
   * @param {String} userId
   * @return {Object} user
   */
  findUserById: async (userId) => {
    return await UserModel.findOne({
      _id: userId,
      status: Config.ACCOUNT_STATUS.ACTIVE
    }).exec();
  },

  /**
   *
   * @param {String} userId
   * @param {Object} newInfo include {fullName, phone, address}
   * @return {Object} new user info
   */
  updateUserInfo: async (userId, newInfo) => {
    try {
      return await UserModel.findOneAndUpdate(
        { _id: userId },
        { ...newInfo, updatedAt: Date.now() },
        { new: true }
      ).select([...Object.keys(newInfo), "updatedAt"]);
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
   * @param {string} userId
   * @param {string} email
   * @param {string} key
   * @return {object}
   */
  verifyEmail: async (userId, email, key) => {
    let user = null;
    try {
      const result = await VerifyService.validateUser(email, key);
      if (result === true) {
        user = await UserModel.findOneAndUpdate(
          { _id: userId },
          { email: email, updatedAt: Date.now() },
          { new: true }
        ).select(["email", "updatedAt"]);
      }
    } catch (error) {
      throw Error(error);
    }
    return user;
  },

  /**
   *
   * @param {string} userId
   * @return {object} wish list of user
   */
  getWishList: async (userId) => {
    let user;
    try {
      user = await UserModel.findById(userId).select("wishList").exec();
    } catch (error) {
      console.log(error);
      return null;
    }
    if (user) {
      try {
        const courseIds = user.wishList;
        const courses = await CourseModel.find({
          _id: {
            $in: courseIds
          }
        })
          .populate([
            {
              path: "category",
              select: "categoryName"
            },
            {
              path: "courseLecturers",
              select: "fullName"
            }
          ])
          .select([
            "courseName",
            "category",
            "courseLecturers",
            "ratingPoint",
            "ratedNumber",
            "courseImage",
            "price",
            "promotionalPrice"
          ]);
        return courses;
      } catch (error) {
        throw Error(error);
      }
    }
    return null;
  },
  /**
   *
   * @param {String} userId id of user
   * @param {String} courseId course id
   */
  addToWishList: async (userId, courseId) => {
    try {
      const user = await UserModel.findByIdAndUpdate(
        userId,
        { $addToSet: { wishList: courseId } },
        { new: true }
      )
        .select("wishList")
        .exec();
      return user.wishList;
    } catch (error) {
      console.log(error);
    }
  },
  /**
   *
   * @param {String} userId id of user
   * @param {Array} courseIds list of course id
   */
  deleteCoursesFromWishList: async (userId, courseIds) => {
    let user = null;
    try {
      user = await UserModel.findByIdAndUpdate(
        userId,
        {
          $pull: {
            wishList: {
              $in: courseIds
            }
          }
        },
        { new: true }
      )
        .select("wishList")
        .exec();
    } catch (error) {
      console.log(error);
    }
    return user;
  },

  /**
   *
   * @param {String} userId id of user
   */
  getRegisteredList: async (userId) => {
    let user = null;
    try {
      user = await EnrollmentModel.find({
        userId: userId
      })
        .populate({
          path: "courseId",
          populate: [
            {
              path: "category",
              select: "categoryName"
            },
            {
              path: "courseLecturers",
              select: "fullName"
            }
          ],
          select: [
            "courseName",
            "category",
            "courseLecturers",
            "ratingPoint",
            "ratedNumber",
            "courseImage",
            "price",
            "promotionalPrice"
          ]
        })
        .select("courseId");
    } catch (error) {
      console.log(error);
    }
    return user;
  },

  /**
   * Add an user to database
   * @param {object} user object user
   * @return {object} user
   */
  createUser: async (user) => {
    const newUser = createUserTemplate(user);
    if (newUser === null) {
      return null;
    }

    const res = await mCheckUsernameIsValid(newUser.username);
    if (!res) {
      return null;
    }

    const validEmail = await checkValidEmail(user);
    if (!validEmail) {
      console.log("email is not valid");
      return null;
    }

    const result = await VerifyService.createNewValidateRequest(user.email);
    if (result === null) {
      return null;
    }

    newUser.password = bcrypt.hashSync(newUser.password, salt);
    // const securedUser = makeSecurityPassword(newUser);
    await UserModel.create(newUser);
    delete newUser.password;
    return newUser;
  },

  checkValidUsername: async (username) => {
    return await mCheckUsernameIsValid(username);
  },

  verifyUser: async (email, key) => {
    const valid = await VerifyService.validateUser(email, key);
    if (!valid) {
      return false;
    }

    const filter = {
      email: email
    };
    const updateInfo = {
      status: CONST.STATUS_ACTIVE
    };
    await UserModel.findOneAndUpdate(filter, updateInfo);
    return true;
  },

  logIn: async (loginInfo) => {
    const user = await UserModel.findOne({
      username: loginInfo.username
    }).exec();
    if (
      user === null ||
      !bcrypt.compareSync(loginInfo.password, user.password) ||
      user.status !== CONST.STATUS_ACTIVE
    ) {
      return { authenticated: false };
    }
    const payload = {
      userId: user._id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      avatar: user.avatar,
      type: "student"
    };
    const opts = {
      expiresIn: 10 * 60 * 60 * 24 // seconds
    };
    const accessToken = jwt.sign(payload, process.env.NOT_A_SECRET_KEY, opts);

    const refreshToken = randomstring.generate(80);
    await UserModel.findByIdAndUpdate(user._id, { rfToken: refreshToken });
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
    const user = await isValidRfToken(userId, refreshToken);
    if (user) {
      const payload = {
        userId: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        type: "student"
      };
      const opts = {
        expiresIn: 10 * 60 * 60 * 24 // seconds
      };
      const newAccessToken = jwt.sign(
        payload,
        process.env.NOT_A_SECRET_KEY,
        opts
      );
      return {
        accessToken: newAccessToken
      };
    } else {
      return null;
    }
  },

  logOut: async (logoutInfo) => {
    const { userId, type } = logoutInfo;
    switch (type) {
      case "student":
        const user = await UserModel.findByIdAndUpdate(userId, { rfToken: "" });
        return user;
      case "lecturer":
        const lecturer = await LecturerModel.findByIdAndUpdate(userId, {
          rfToken: ""
        });
        return lecturer;
      case "admin":
        const admin = await AdminModel.findByIdAndUpdate(userId, {
          rfToken: ""
        });
        return admin;
      default:
        return null;
    }
  },

  removeCourseFromWishListForAllUser: async (courseId) => {
    return await mRemoveCourseFromWishListForAllUser(courseId);
  },

  changeUserAvatar: async (userId, imgFilePath) => {
    const newAvatarUrl = await ImgUtil.getNewFileUrl(imgFilePath);
    fs.unlinkSync(imgFilePath);
    const result = UserModel.findByIdAndUpdate(
      userId,
      { avatar: newAvatarUrl, updatedAt: Date.now() },
      { new: true }
    ).select("avatar");
    return result;
  },

  getAllUser: async () => {
    return await getAllUsers();
  },

  getUserByUserId: async (userId) => {
    return await mGetUserById(userId);
  },

  deleteUserByUserId: async (userId) => {
    return await mDeleteUserById(userId);
  }
};

/**
 * get All user in db
 * @return {Promise<Array<object>>}
 */
async function getAllUsers() {
  const resl = await UserModel.find({})
    .select([
      "username",
      "fullName",
      "email",
      "avatar",
      "address",
      "createdAt",
      "updatedAt",
      "status",
      "wishList"
    ])
    .populate("wishList");
  return resl;
}

/**
 * check username is registed
 * @param {string} username username
 * @return {bool}
 */
async function mCheckUsernameIsValid(username) {
  const res = await UserModel.findOne({ username: username });
  if (res) {
    return false;
  } else {
    return true;
  }
}

/**
 * create user from raw infomation
 * @param {object} rawUser user information
 * @return {object} valid user
 */
function createUserTemplate(rawUser) {
  const user = rawUser;
  user.username = rawUser.username || "";
  user.password = rawUser.password || "";
  user.fullName = rawUser.fullName || "";
  user.address = rawUser.address || "";
  user.email = rawUser.email || "";
  user.createdAt = rawUser.createdAt || Date.now();
  user.updatedAt = Date.now();
  user.status = rawUser.status || CONST.STATUS_PENDING;
  user.avatar = rawUser.avatar || CONST.URL.DEFAULT_AVATAR;
  user.phone = rawUser.phone || "";
  user.wishList = rawUser.wishList || [];
  user.registeredList = rawUser.registeredList || [];

  const valid = validateUserObject(user);
  if (!valid) {
    return null;
  }
  return user;
}

/**
 * Validate user
 * @param {object} user user to validate
 * @return {bool} isvalid
 */
function validateUserObject(user) {
  const validate = ajv.getSchema("user");
  const valid = validate(user);
  if (!valid) {
    console.log(validate.errors);
    console.log({
      error: "input error",
      detail: validate.errors
    });
    return false;
  }
  return true;
}

/**
 * change string password to jwt
 * @param {object} user user object
 * @return {object} new user
 */
// function makeSecurityPassword(user) {
//   const newPassword = bcrypt.hashSync(user.password, 10);
//   const result = user;
//   result.password = newPassword;
//   return result;
// }

/**
 * Check email is valid or not
 * @param {object} user user object
 * @return {bool}
 */
async function checkValidEmail(user) {
  const filter = {
    email: user.email
  };
  const result = await UserModel.findOne(filter);
  if (result === null) {
    return true;
  }
  return false;
}

/**
 *
 * @param {string} email
 * @return {bool}
 */
async function checkEmailExists(email) {
  try {
    const result = await UserModel.findOne({ email: email }).exec();
    if (!result) {
      return true;
    }
  } catch (error) {
    throw Error(error);
  }
  return false;
}

/**
 * Check valid rfToken by userId
 * @param {string} userId userId
 * @param {string} refreshToken refreshToken
 * @return {bool}
 */
async function isValidRfToken(userId, refreshToken) {
  const user = await UserModel.findById(userId).exec();
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
async function mRemoveCourseFromWishListForAllUser(courseId) {
  const users = await UserModel.find({
    wishList: { _id: courseId }
  });

  for (let index = 0; index < users.length; index++) {
    await mDeleteCourseFromWishList(users[index]._id, courseId);
  }

  return users.length;
}

/**
 *
 * @param {string} userId userId
 * @param {string} courseId courseId
 * @return {object}
 */
async function mDeleteCourseFromWishList(userId, courseId) {
  const wishList = await mGetWishList(userId);
  const pos = wishList.indexOf(courseId);
  if (pos > -1) {
    wishList.splice(pos, 1);
    console.log("wishList", wishList);
    const res = await UserModel.findByIdAndUpdate(userId, {
      wishList: wishList
    });
    return res;
  } else {
    return null;
  }
}

/**
 * Get list teaching course of lecturer
 * @param {string} userId id
 * @return {Promise<Array<object>>}
 */
async function mGetWishList(userId) {
  const res = await UserModel.findById(userId);
  return res.wishList;
}

//  mGetUserDetail
/**
 * get user by Id
 * @param {string} userId user id
 * @return {Promise<object>}
 */
async function mGetUserById(userId) {
  return await UserModel.findById(userId);
}

/**
 * get user by Id
 * @param {string} userId user id
 * @return {Promise<number>}
 */
async function mDeleteUserById(userId) {
  const updateInfo = {
    status: "DETELED"
  };
  return await UserModel.findByIdAndUpdate(userId, updateInfo);
}
