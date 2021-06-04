"use strict";
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const registerSchema = require("../utils/schemas/register_student.schema.json");
const updateSchema = require("../utils/schemas/user.schema.json");
const validateSchema = require("../utils/schemas/validate_student.schema.json");
// const loginSchema = require("../utils/schemas/login.schema.json")
ajv.addSchema(registerSchema, "register_student");
ajv.addSchema(updateSchema, "user");
ajv.addSchema(validateSchema, "validate_student");
// ajv.addSchema(loginSchema, "login");

module.exports = ajv;
