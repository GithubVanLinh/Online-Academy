// const cryptoRandomString = require("crypto-random-string");
"use strict";
const randomstring = require("randomstring");

const transport = require("../configs/email.config");
const VerifyModel = require("../models/verify.model");

module.exports = {
  createNewValidateRequest: async (email) => {
    const validator = await checkEmailValidateRequestIsExists(email);
    let key;
    if (validator) {
      key = validator.key;
    } else {
      key = generateVerifyCode(10);
    }
    const succ = await sendVerifyMail(email, key);
    if (!succ) {
      console.log("send verify email failed");
      return null;
    }

    const result = await VerifyModel.create({
      email: email,
      key: key
    });
    return result;
  },

  createNewValidateRequestV2: async (email) => {
    const validator = await checkEmailValidateRequestIsExists(email);
    let key;
    let result = null;
    if (validator) {
      key = validator.key;
      result = {...validator};
    } else {
      key = generateVerifyCode(10);
      result = await VerifyModel.create({
        email: email,
        key: key
      });
    }
    const succ = await sendVerifyMail(email, key);
    if (!succ) {
      console.log("send verify email failed");
      throw Error(`Can not send verify email to ${email}`);
    }
    return result;
  },

  validateUser: async (email, key) => {
    if (checkKeyValidUser(email, key)) {
      const filter = {
        email: email,
        key: key
      };

      const result = await VerifyModel.findOneAndDelete(filter);
      if (result == null) {
        return false;
      }

      return true;
    }
  }
};

/**
 * generate random string
 * @param {int} num length of string
 * @return {string} random string
 */
function generateVerifyCode(num) {
  // return cryptoRandomString(num);
  return randomstring.generate(num);
}

/**
 * send verify email
 * @param {string} desMail to email
 * @param {string} key content email
 * @return {bool} sent
 */
async function sendVerifyMail(desMail, key) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: process.env.GMAIL_NAME,
      to: desMail,
      subject: "Online Academy - Your Verify Code",
      text: `Your Verify Code: ${key}`
    };
    transport.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

/**
 * Check if validate request is exists
 * @param {string} email mail need verify
 * @return {object} return object validate if exists esle return null
 */
async function checkEmailValidateRequestIsExists(email) {
  const filter = {
    email: email
  };
  const result = await VerifyModel.findOne(filter);
  return result;
}

/**
 * check if verify code is valid
 * @param {string} email email
 * @param {string} key code verify
 * @return {bool}
 */
async function checkKeyValidUser(email, key) {
  const validator = await checkEmailValidateRequestIsExists(email);
  if (validator && key == validator.key) {
    return true;
  } else {
    return false;
  }
}
