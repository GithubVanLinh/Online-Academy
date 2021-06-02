"use strict";
const nodemailer = require("nodemailer");
const smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_NAME,
    pass: process.env.GMAIL_PASSWORD
  }
});
module.exports = smtpTransport;


