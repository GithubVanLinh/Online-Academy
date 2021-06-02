"use strict";
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
require("./configs/db.config");

const http = require("http");
const app = express();

const server = http.createServer(app);

app.use(express.json());
app.use(morgan("dev"));

// define routing
const guestRouter = require("./routes/guest.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
app.use("/auth", authRouter);
app.use("/:userId", userRouter);
app.use(guestRouter);

// define error route handler
app.use((req, res, next) => {
  res.status(404).json({
    error: "checking your url!"
  });
});
// define error hander
app.use((err, req, res, next) => {
  console.log("Server Error: ", err);
  res.status(500).json({
    error: "Server Error, please try again"
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("app is listening on port: " + PORT);
});
