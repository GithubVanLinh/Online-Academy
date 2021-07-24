"use strict";
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const accessToken = req.headers["x-access-token"];
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.NOT_A_SECRET_KEY);
      if (decoded.type === "lecturer") {
        req.accessTokenPayload = decoded;
        next();
      } else {
        return res.status(401).json({
          message: "Invalid lecturer access token"
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(401).json({
        message: "Invalid access token!"
      });
    }
  } else {
    return res.status(400).json({
      message: "Access token not found!"
    });
  }
};
