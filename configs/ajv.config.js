const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

const registerSchema = require("../utils/schemas/register.schema.json");

ajv.addSchema(registerSchema, "register");

module.exports = ajv;
