"use strict";
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

ajv.addFormat("phone", /^0[0-9]{9}$/);

const registerSchema = require("../utils/schemas/register_student.schema.json");
const updateSchema = require("../utils/schemas/user.schema.json");
const validateSchema = require("../utils/schemas/validate_student.schema.json");
const loginSchema = require("../utils/schemas/login.schema.json")
const updateUserInfoSchema = require("../utils/schemas/update_user_info.schema.json");
const updateUserPassword = require("../utils/schemas/update_user_password.schema.json");

ajv.addSchema(registerSchema, "register_student");
ajv.addSchema(updateSchema, "user");
ajv.addSchema(validateSchema, "validate_student");
ajv.addSchema(loginSchema, "login");
ajv.addSchema(updateUserInfoSchema, "update_user_info");
ajv.addSchema(updateUserPassword, "update_user_password");

module.exports = ajv;
