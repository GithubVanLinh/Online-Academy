"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const UserModel = require("../models/user.model");
const CourseModel = require("../models/course.model");
const EnrollmentModel = require("../models/enrollment.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

// Define
const user1 = {
  _id: "60b8d2958e620084208eb793",
  username: "user1Name",
  password: "$2b$10$BzyKBuWNNnPZ.xi2UGnx/elzl.GA.yK/igpTSLQYp.5ohcDgzuwQS",
  email: "test1@a.c",
  phone: "0937646422",
  fullName: "Phan Tan Khoa",
  address: "TP Ho Chi Minh",
  createdAt: "2021-06-03T13:01:03.808Z",
  updatedAt: "2021-06-04T07:33:30.549Z",
  status: "ACTIVE",
  avatar: "https://i.ibb.co/syMW841/user.jpg",
  wishList: ["60b748b2a651451b6f25b377"],
  rfToken:
    "a6NiCbIayUa6CWJ8rzwX2ZpWZJwzojkvCOQNAZHxohUPCXpn9HSoENw8qwg7zVHcgvm3OTm2HExNd9sK"
};

const user2 = {
  _id: "60b8d2958e620084208eb983",
  username: "user2Name",
  password: "$2b$10$BzyKBuWNNnPZ.xi2UGnx/elzl.GA.yK/igpTSLQYp.5ohcDgzuwQS",
  email: "test2@a.c",
  phone: "0937646422",
  fullName: "Phan Tan Khoa",
  address: "TP Ho Chi Minh",
  createdAt: "2021-06-03T13:01:03.808Z",
  updatedAt: "2021-06-04T07:33:30.549Z",
  status: "ACTIVE",
  avatar: "https://i.ibb.co/syMW841/user.jpg",
  wishList: [],
  rfToken:
    "a6NiCbIayUa6CWJ8rzwX2ZpWZJwzojkvCOQNAZHxohUPCXpn9HSoENw8qwg7zVHcgvm3OTm2HExNd9sK"
};

const course1 = {
  _id: "60b748b2a651451b6f25b377",
  courseName: "React - The Complete Guide (incl Hooks, React Router, Redux)",
  courseImage: "url(string)",
  courseLecturers: ["60b74346a651451b6f25b376"],
  category: "60b73923a651451b6f25b374",
  price: 100000,
  promotionalPrice: 10,
  briefDescription: "Dive in and learn React.js from scratch! Learn Reactjs,",
  detailDescription:
    "This course is the most up-to-date, comprehensive and bestselling",
  soldNumber: 0,
  ratedNumber: 0,
  lessionNumber: 5,
  totalHours: 0,
  ratingPoint: 0,
  status: "INCOMPLETE",
  createdAt: "2021-06-02T06:10:57.918Z",
  updatedAt: "2021-06-02T06:11:57.918Z",
  feedbacks: [],
  view: 5
};

const course2 = {
  _id: "60b748b2a651451b6f25b967",
  courseName: "React Redux)",
  courseImage: "url(string)",
  courseLecturers: ["60b74346a651451b6f25b376"],
  category: "60b73923a651451b6f25b374",
  price: 200000,
  promotionalPrice: 10,
  briefDescription: "Dive in and learn React.js from scratch! Learn Reactjs,",
  detailDescription:
    "This course is the most up-to-date, comprehensive and bestselling",
  soldNumber: 0,
  ratedNumber: 0,
  lessionNumber: 5,
  totalHours: 0,
  ratingPoint: 0,
  status: "INCOMPLETE",
  createdAt: "2021-06-02T06:10:57.918Z",
  updatedAt: "2021-06-02T06:11:57.918Z",
  feedbacks: [],
  view: 5
};

const enroll1 = {
  _id: "60b8d370b15d1bfb4ada84ef",
  userId: user1._id,
  courseId: course1._id,
  registeredTime: "2021-06-03T06:10:57.918Z"
};

describe("#Enrollment", async () => {
  before(async () => {
    await require("../configs/db.config");
  });

  beforeEach(async () => {
    await UserModel.create(user1);
    await UserModel.create(user2);
    await CourseModel.create(course1);
    await CourseModel.create(course2);
    await EnrollmentModel.create(enroll1);
  });
  afterEach(async () => {
    await UserModel.deleteMany({}, {});
    await CourseModel.deleteMany({}, {});
    await EnrollmentModel.deleteMany({}, {});
  });

  describe("#Enroll a course", async () => {
    it("it should join a course", async () => {
      const body = {
        userId: user2._id,
        courseId: course1._id
      };
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .post("/enrollments")
        .send(body);
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(200);
      res.body.should.be.a("object");

      const enrollments = await EnrollmentModel.find({});
      enrollments.length.should.have.eql(2);
    });
  });
});
