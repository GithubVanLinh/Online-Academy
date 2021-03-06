"use strict";
const express = require("express");
const morgan = require("morgan");
require("express-async-errors");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

require("./configs/db.config");
require("./configs/model.config");

const http = require("http");
const app = express();
app.use(cors());

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(express.static("public"));

// define routing
// const guestRouter = require("./routes/guest.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const courseRouter = require("./routes/course.route");
const categoryRouter = require("./routes/category.route");
const searchRouter = require("./routes/search.route");
const statisticRouter = require("./routes/statistic.route");
const lecturerRouter = require("./routes/lecturer.route");
const enrollmentRouter = require("./routes/enrollment.route");
const progressRouter = require("./routes/progress.route");
const sectionRouter = require("./routes/section.route");
const lessonRouter = require("./routes/lesson.route");
const adminRouter = require("./routes/admin.route");
app.use("/api/search", searchRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/courses", courseRouter);
app.use("/categories", categoryRouter);
app.use("/statistics", statisticRouter);
app.use("/lecturers", lecturerRouter);
app.use("/enrollments", enrollmentRouter);
app.use("/progresses", progressRouter);
app.use("/sections", sectionRouter);
app.use("/lessons", lessonRouter);
app.use("/admin", adminRouter);

// define error route handler
app.use((req, res, next) => {
  res.status(404).json({
    error_message: "Endpoint not found!"
  });
});
// define error handler
app.use((err, req, res, next) => {
  console.log("Server Error: ", err);
  res.status(500).json({
    error_message: "Something broke"
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(
    `${process.env.NODE_ENV} api is running at http://localhost:${PORT}`
  );
});

module.exports = app;
