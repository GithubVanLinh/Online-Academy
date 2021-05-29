const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const registerSchema = require("../utils/schemas/register_student.schema.json");
const updateSchema = require("../utils/schemas/user.schema.json");

ajv.addSchema(registerSchema, "register_student");
ajv.addSchema(updateSchema, "user");

module.exports = ajv;
