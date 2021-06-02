"use strict";
const ajv = require("../configs/ajv.config");

module.exports = {
  validateRequestBody: (type) => (req, res, next) => {
    const validate = ajv.getSchema(type);

    valid = validate(req.body);

    if (!valid) {
      console.log(validate.errors);
      res.status(400).json({
        error: "input error",
        detail: validate.errors
      });
      return;
    }
    return next();
  }
};
