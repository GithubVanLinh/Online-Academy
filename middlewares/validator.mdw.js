const ajv = require("../configs/ajv.config");

module.exports = {
  validateRegisterBody: (req, res, next) =>{
    const validate = ajv.getSchema("register");

    valid = validate(req.body);

    if (!valid) {
      console.log(validate.errors);
      res.status(400).json({
        "error": "input error",
        "detail": validate.errors,
      });
      return;
    }
    return next();
  },
};
