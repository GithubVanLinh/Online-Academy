"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const UserModel = require("../models/user.model");
const CourseModel = require("../models/course.model");
const EnrollmentModel = require("../models/enrollment.model");
const LecturerModel = require("../models/lecturer.model");
const AdminModel = require("../models/administrator.model");
const LessonModel = require("../models/lesson.model");
const SectionModel = require("../models/section.model");
const ProgressModel = require("../models/progress.model");

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
    for (let i = 0; i < sample.courses.length; i++) {
      await CourseModel.create(sample.courses[i]);
    }
    for (let i = 0; i < sample.enrollments.length; i++) {
      await EnrollmentModel.create(sample.enrollments[i]);
    }
    for (let i = 0; i < sample.lecturers.length; i++) {
      await LecturerModel.create(sample.lecturers[i]);
    }
    for (let i = 0; i < sample.admins.length; i++) {
      await AdminModel.create(sample.admins[i]);
    }
    for (let i = 0; i < sample.section.length; i++) {
      await SectionModel.create(sample.section[i]);
    }
    for (let i = 0; i < sample.lesson.length; i++) {
      await LessonModel.create(sample.lesson[i]);
    }
    for (let i = 0; i < sample.progress.length; i++) {
      await ProgressModel.create(sample.progress[i]);
    }
  });
  afterEach(async () => {
    await UserModel.deleteMany({}, {});
    await CourseModel.deleteMany({}, {});
    await EnrollmentModel.deleteMany({}, {});
    await LecturerModel.deleteMany({}, {});
    await AdminModel.deleteMany({}, {});
    await SectionModel.deleteMany({}, {});
    await LessonModel.deleteMany({}, {});
    await ProgressModel.deleteMany({}, {});
  });

  describe("#Remove Course", async () => {
    it("it should remove course", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .delete(`/admin/courses/${sample.courses[0]._id}`);

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

      // delete all lesson of course
      const lesson = await LessonModel.find({
        courseId: sample.courses[0]._id
      });
      lesson.length.should.have.eql(2);
      lesson[0].isDeleted.should.have.eql(true);

      // delete all progress of course
      const progress = await ProgressModel.find({
        courseId: sample.courses[0]._id
      });
      progress.length.should.have.eql(0);

      // delete all section of course
      const sections = await SectionModel.find({
        courseId: sample.courses[0]._id
      });
      sections.length.should.have.eql(2);
      sections[0].isDeleted.should.have.eql(true);
    });

    it("it should remove course fail", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .delete(`/admin/courses/${sample.courses[0]._id}2`)

      // must recived status bad request
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(404);
      res.body.should.have.property("error_message").eql("Invalid CourseId");
    });
  });

  describe("#Get All Student", async () => {
    it("it should get all student", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .get("/admin/users");

      // must recived status success
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.have.eql(sample.lecturers.length);
      console.log(res.body);
      res.body[0].should.have.property("username").eql(sample.users[0].username)
    });
  });

  describe("#Get Student Detail", async () => {
    it("it should get student detail", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .get(`/admin/users/${sample.users[0]._id}`);

      // must recived status success
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("username").eql(sample.users[0].username)
    });

    it("it should get student detail failed when wrong username", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .get(`/admin/users/${sample.users[0]._id}2`);

      // must recived status success
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("error_message").eql("invalid userId")
    });
  });

  describe("#Delete Student", async () => {
    it("it should remove student", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .delete(`/admin/users/${sample.users[0]._id}`);

      // must recived status success
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("user has removed")

      // all enrollment that user registed must be deleted
      const enrols = await EnrollmentModel.find({
        userId: sample.users[0]._id
      });
      enrols.length.should.have.eql(0);

      // all progress that user registed must be deleted
      const prgress = await ProgressModel.find({
        userId: sample.users[0]._id
      });
      console.log("userID:",sample.users[0]._id, "prgs", prgress);
      prgress.length.should.have.eql(0);
    });

    it("it should delete student failed when wrong username", async () => {
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .delete(`/admin/users/${sample.users[0]._id}2`);

      // must recived status success
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("error_message").eql("invalid userId")
    });
  });

});
