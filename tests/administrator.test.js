"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const UserModel = require("../models/user.model");
const CourseModel = require("../models/course.model");
const EnrollmentModel = require("../models/enrollment.model");
const LecturerModel = require("../models/lecturer.model");
const AdminModel = require("../models/administrator.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

// Define
const sample = require("./sample");

describe("Admins", async () => {
  before(async () => {
    await require("../configs/db.config");
  });

  beforeEach(async () => {
    for (let i = 0; i < sample.users.length; i++) {
      await UserModel.create(sample.users[i]);
    }
    for (let i = 0; i < sample.users.length; i++) {
      await CourseModel.create(sample.courses[i]);
    }
    for (let i = 0; i < sample.users.length; i++) {
      await EnrollmentModel.create(sample.enrollments[i]);
    }
    for (let i = 0; i < sample.users.length; i++) {
      await LecturerModel.create(sample.lecturers[i]);
    }
    for (let i = 0; i < sample.users.length; i++) {
      await AdminModel.create(sample.admins[i]);
    }
  });
  afterEach(async () => {
    await UserModel.deleteMany({}, {});
    await CourseModel.deleteMany({}, {});
    await EnrollmentModel.deleteMany({}, {});
    await LecturerModel.deleteMany({}, {});
    await AdminModel.deleteMany({}, {});
  });

  describe("#Remove Course", async () => {
    it("it should remove course", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .delete(`/courses/${sample.courses[0]._id}`);

      // must recived status success
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(200);
      res.body.should.have
        .property("message")
        .eql(`${sample.courses[0]._id} delete success`);

      // number of course is not change
      const courses = await CourseModel.find({});
      courses.length.should.have.eql(2);

      // course status must be deleted
      courses[0].status.should.have.eql("DELETED");

      // course in lecturer must be removed
      const lecturers = await LecturerModel.find({
        teachingCourses: sample.courses[0]._id
      });
      console.log("lecturers", lecturers);
      lecturers.length.should.have.eql(0)

      // wishList of student must be removed
      const students = await UserModel.find({
        wishList: sample.courses[0]._id
      });
      console.log("students", students);
      students.length.should.have.eql(0)

      // course resgisted of student must be removed
      const enrolls = await EnrollmentModel.find({
        courseId: sample.courses[0]._id
      });
      enrolls.length.should.have.eql(0)
    });

    it("it should remove course", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .delete(`/courses/${sample.courses[0]._id}2`)

      // must recived status bad request
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(404);
      res.body.should.have.property("error_message").eql("Invalid CourseId");
    });
  });
});
