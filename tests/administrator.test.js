"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const UserModel = require("../models/user.model");
const VerifyModel = require("../models/verify.model");
const CourseModel = require("../models/course.model");
const EnrollmentModel = require("../models/enrollment.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

const user1Password = "abc";
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
  username: "user1Name",
  password: "$2b$10$BzyKBuWNNnPZ.xi2UGnx/elzl.GA.yK/igpTSLQYp.5ohcDgzuwQS",
  email: "test2@a.c",
  phone: "0937646422",
  fullName: "Phan Tan Khoa",
  address: "TP Ho Chi Minh",
  createdAt: "2021-06-03T13:01:03.808Z",
  updatedAt: "2021-06-04T07:33:30.549Z",
  status: "PENDING",
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

describe("Students", async () => {
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
    await VerifyModel.deleteMany({}, {});
    await CourseModel.deleteMany({}, {});
    await EnrollmentModel.deleteMany({}, {});
  });

  describe("#Persional Profile", async () => {
    it("it should change email", async () => {
      const body = {
        email: "tes@a.c"
      };
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .post(`/users/${user1._id}/email`)
        .send(body);
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(200);
      res.body.should.have.property("message").eql("verify your email");
    });

    it("it should take a error message when update to already email", async () => {
      const body = {
        email: user2.email
      };
      await chai.request(app).post(`/users/${user1._id}/email`).send(body);
      const res = await chai
        .request(app)
        .post(`/users/${user1._id}/email`)
        .send(body);
      should.exist(res);
      should.exist(res.body);
      res.should.have.status(400);
      res.body.should.have.property("error").eql("email is already taken");
    });

    it("it should change fullname", async () => {
      const body = {
        fullName: "Thanh Long",
        phone: user1.phone,
        address: user1.address
      };
      const res = await chai
        .request(app)
        .patch(`/users/${user1._id}`)
        .send(body);
      should.exist(res);
      should.exist(res.body);
      console.log("body", res.body);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("fullName").eql(body.fullName);

      const user = await UserModel.find({});
      user[0].should.have.property("fullName").eql(body.fullName);
    });

    it("it should take failed when change email", async () => {
      const body = {
        fullName: "Thanh Long",
        phone: user1.phone,
        address: user1.address,
        email: "rcs@c.c"
      };
      const res = await chai
        .request(app)
        .patch(`/users/${user1._id}`)
        .send(body);
      should.exist(res);
      should.exist(res.body);
      console.log("body", res.body);
      res.should.have.status(400);
      res.body.should.be.a("object");

      const user = await UserModel.find({});
      user[0].should.have.property("fullName").eql(user1.fullName);
    });

    it("it should change password", async () => {
      const body = {
        currentPassword: user1Password,
        newPassword: "newPassword"
      };
      // eslint-disable-next-line quotes
      const res = await chai
        .request(app)
        .patch(`/users/${user1._id}/password`)
        .send(body);
      should.exist(res);
      should.exist(res.body);
      console.log("body: ", res.body);
      res.should.have.status(200);
      res.body.should.have.property("password").not.eql(user1.password);

      const users = await UserModel.find({});
      console.log("users", users);
      users[0].should.have.property("password").eql(res.body.password);
    });
  });

  describe("#Get WatchList", async () => {
    it("it should get WatchList", async () => {
      const res = await chai.request(app).get(`/users/${user1._id}/wishList`);
      should.exist(res);
      should.exist(res.body);
      console.log("watch list", res.body);
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.have.eql(1);
      res.body[0].should.have.property("courseName").eql(course1.courseName);
    });
  });

  describe("#Remove item from WatchList", async () => {
    it("it should remove item from WatchList", async () => {
      const body = {
        courseIds: [course1._id]
      };
      const res = await chai
        .request(app)
        .patch(`/users/${user1._id}/wishList`)
        .send(body);
      should.exist(res);
      should.exist(res.body);
      console.log(res.body);
      res.should.have.status(200);
      res.body.wishList.should.be.a("array");

      const users = await UserModel.find({});
      users[0].wishList.length.should.have.eql(0);
    });
  });

  describe("#Get Courses are registed", async () => {
    it("it should get all courses are registed", async () => {
      const res = await chai.request(app).get(`/users/${user1._id}/registeredList`);
      should.exist(res);
      should.exist(res.body);
      console.log("registed list", res.body);
      res.should.have.status(200);
      res.body.should.be.a("array");
      res.body.length.should.have.eql(1);
      res.body[0].should.have.property("courseName").eql(course1.courseName);
    });

    it("it should fail are registed", async () => {
      const res = await chai.request(app).get(`/users/${user1._id}7/registeredList`);
      should.exist(res);
      should.exist(res.body);
      console.log("registed list", res.body);
      res.should.have.status(400);
      console.log(res.body);
    });
  });
  
  // describe("#Add item to WatchList", async () => {
  //   it("it should add item to WatchList", async () => {
  //     const body = {
  //       courseIds: [course1._id]
  //     };
  //     const res = await chai
  //       .request(app)
  //       .patch(`/users/${user1._id}/wishList`)
  //       .send(body);
  //     should.exist(res);
  //     should.exist(res.body);
  //     console.log(res.body);
  //     res.should.have.status(200);
  //     res.body.wishList.should.be.a("array");

  //     const users = await UserModel.find({});
  //     users[0].wishList.length.should.have.eql(0);
  //   });
  // });

  // describe("#get", async () => {
  //   it("it should add item to WatchList", async () => {
  //     const body = {
  //       courseIds: [course1._id]
  //     };
  //     const res = await chai
  //       .request(app)
  //       .patch(`/users/${user1._id}/wishList`)
  //       .send(body);
  //     should.exist(res);
  //     should.exist(res.body);
  //     console.log(res.body);
  //     res.should.have.status(200);
  //     res.body.wishList.should.be.a("array");

  //     const users = await UserModel.find({});
  //     users[0].wishList.length.should.have.eql(0);
  //   });
  // });
});
