"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const UserModel = require("../models/user.model");
const VerifyModel = require("../models/verify.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

// Define
const user1 = {
  _id: "60b8d2958e620084208eb793",
  username: "user1Name",
  password: "$2a$10$GSEUyl/GnQhW1DIqJrXzx.qBRsfN.U9zkS5eh6AzoMRvDSASW9jYO",
  email: "test@a.c",
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
}

const verify1 = {
  _id: "60b8d2958e620084208eb333",
  email: user1.email,
  key: "1234567890"
}

describe("Users", async () => {
  before(async () => {
    await require("../configs/db.config");
  });

  beforeEach(async () => {
    await UserModel.create(user1);
  });
  beforeEach(async () => {
    await VerifyModel.create(verify1);
  });
  afterEach(async () => {
    await UserModel.deleteMany({}, {});
    await VerifyModel.deleteMany({}, {});
  });
  // beforeEach((done) => {
  //   UserModel.deleteMany({}, {}, (err) => {
  //     done();
  //   });
  // });

  describe("#Register",async () => {
    it("it should create a student success", async () => {
      const user = {
        username: "abcd",
        password: "abc",
        fullName: "vanlinh",
        email: "vovanlinhleo1999@gmail.com",
        avatar: "http://abc.ch"
      };
      const res = await chai.request(app).post("/users").send(user);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(201);
      res.body.should.be.a("object");
      res.body.should.have.property("status").eql("PENDING");
      const users =await UserModel.find({});
      users.length.should.be.eql(2);

      const verifies = await VerifyModel.find({});
      verifies.length.should.be.eql(2);
      verifies[1].should.have.property("email").eql(user.email);
    });

    it("it should create a student failed", async () => {
      const user = {
        username: "abcd",
        password: "abc",
        fullName: "vanlinh",
        email: user1.email,
        avatar: "http://abc.ch"
      };
      const res = await chai.request(app).post("/users").send(user);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("error_message").eql("cannot create user");
      const users =await UserModel.find({});
      users.length.should.be.eql(1);

      const verifies = await VerifyModel.find({});
      verifies.length.should.be.eql(1);
    });

    it("it should create a student failed when don't have an email", async () => {
      const user = {
        username: "abc",
        password: "abc",
        fullName: "vanlinh",
        avatar: "http://abc.ch"
      };
      const res = await chai.request(app).post("/users").send(user);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(400);
      const users =await UserModel.find({});
      users.length.should.be.eql(1);

      const verifies = await VerifyModel.find({});
      verifies.length.should.be.eql(1);
    });
  });

  describe("#Verify Email",async () => {
    it("it should Email must to Active", async () => {
      const user = {
        email: user1.email,
        key: verify1.key
      };
      const res = await chai.request(app).post("/auth/verify").send(user);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("validate success");

      const verifies = await VerifyModel.find({});
      verifies.length.should.be.eql(0);

      const users = await UserModel.find({});
      users.length.should.be.eql(1);
      users[0].should.have.property("status").eql("ACTIVE");
    });
  });

  /*
   * Test the /POST route
   */
  // describe("/POST book", () => {
  //   it("it should not POST a book without pages field", (done) => {
  //     const book = {
  //       title: "The Lord of the Rings",
  //       author: "J.R.R. Tolkien",
  //       year: 1954
  //     };
  //     chai
  //       .request(app)
  //       .post("/book")
  //       .send(book)
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a("object");
  //         res.body.should.have.property("errors");
  //         res.body.errors.should.have.property("pages");
  //         res.body.errors.pages.should.have.property("kind").eql("required");
  //         done();
  //       });
  //   });
  // });
});
