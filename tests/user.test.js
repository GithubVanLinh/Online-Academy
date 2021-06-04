"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const UserModel = require("../models/user.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach(async () => {
    await UserModel.deleteMany({}, {});
  });
  // beforeEach((done) => {
  //   UserModel.deleteMany({}, {}, (err) => {
  //     done();
  //   });
  // });

  describe("/POST ", () => {
    it("it should create a student", async () => {
      const user = {
        username: "abc",
        password: "abc",
        fullName: "vanlinh",
        email: "vovanlinhleo1999@gmail.com",
        avatar: "http://abc.ch"
      };
      const res = await chai
        .request(app)
        .post("/users")
        .send(user);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(201);
      res.body.should.be.a("object");
      res.body.should.have.property("status").eql("PENDING");
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
