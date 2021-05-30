// const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const ajv = require("../configs/ajv.config");

const UserModel = require("../models/user.model");
const CONST = require("../models/constrainst");
const VerifySevice = require("./verify.service");
const constrainst = require("../models/constrainst");

module.exports = {
  /**
   * Add an user to database
   * @param {object} user object user
   * @return {object} user
   */
  createUser: async (user) => {
    const newuser = createUserTemplate(user);
    if (newuser === null) {
      return null;
    }

    const validEmail = await checkValidEmail(user);
    if (!validEmail) {
      console.log("email is not valid");
      return null;
    }

    const result = await VerifySevice.createNewValidateRequest(user.email);
    if (result === null) {
      return null;
    }

    const sercuredUser = makeSecurityPassword(newuser);
    const res = await UserModel.create(sercuredUser);

    return res;
  },
  verifyUser: async (email, key) => {
    const valid = VerifySevice.validateUser(email, key);
    if (!valid) {
      return false;
    }

    const filter = {
      email: email,
    };
    const updateInfo = {
      status: constrainst.STATUS_ACTIVE,
    };
    await UserModel.findOneAndUpdate(filter, updateInfo);
    return true;
  },
};

/**
 * create user from raw infomation
 * @param {object} rawuser user information
 * @return {object} valid user
 */
function createUserTemplate(rawuser) {
  const user = rawuser;
  user.username = rawuser.username || "";
  user.password = rawuser.password || "";
  user.fullName = rawuser.fullName || "";
  user.address = rawuser.address || "";
  user.email = rawuser.email || "";
  user.createdAt = rawuser.createdAt || Date.now();
  user.updatedAt = Date.now();
  user.status = rawuser.status || CONST.STATUS_PENDING;
  user.type = rawuser.type || CONST.TYPE_STUDENT;
  user.avatar = rawuser.avatar || "";
  user.phone = rawuser.phone || "";

  valid = validateUserObject(user);
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
  valid = validate(user);
  if (!valid) {
    console.log(validate.errors);
    console.log({
      error: "input error",
      detail: validate.errors,
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
function makeSecurityPassword(user) {
  const newPassword = bcrypt.hashSync(user.password, 10);
  const result = user;
  result.password = newPassword;
  return result;
}

/**
 * Check email is valid or not
 * @param {object} user user object
 * @return {bool}
 */
async function checkValidEmail(user) {
  const filter = {
    email: user.email,
  };
  const result = await UserModel.findOne(filter);
  if (result === null) {
    return true;
  }
  return false;
}
