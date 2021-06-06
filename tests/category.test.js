// "use strict";

// process.env.NODE_ENV = "test";

// // const mongoose = require("mongoose");
// // const Book = require("../app/models/book");
// const UserModel = require("../models/user.model");
// const VerifyModel = require("../models/verify.model");

// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const app = require("../app");
// const should = chai.should();

// chai.use(chaiHttp);

// // Define
// const user1 = {
//   _id: "60b8d2958e620084208eb793",
//   username: "user1Name",
//   password: "$2a$10$GSEUyl/GnQhW1DIqJrXzx.qBRsfN.U9zkS5eh6AzoMRvDSASW9jYO",
//   email: "test@a.c",
//   phone: "0937646422",
//   fullName: "Phan Tan Khoa",
//   address: "TP Ho Chi Minh",
//   createdAt: "2021-06-03T13:01:03.808Z",
//   updatedAt: "2021-06-04T07:33:30.549Z",
//   status: "PENDING",
//   avatar: "https://i.ibb.co/syMW841/user.jpg",
//   wishList: [],
//   rfToken:
//     "a6NiCbIayUa6CWJ8rzwX2ZpWZJwzojkvCOQNAZHxohUPCXpn9HSoENw8qwg7zVHcgvm3OTm2HExNd9sK"
// };

// describe("Users", async () => {
//   before(async () => {
//     await require("../configs/db.config");
//   });

//   beforeEach(async () => {
//     await UserModel.create(user1);
//   });
//   afterEach(async () => {
//     await UserModel.deleteMany({}, {});
//     await VerifyModel.deleteMany({}, {});
//   });

//   describe("#Register", async () => {
//     it("it should create a student success", async () => {
//       const user = {
//         username: "abc",
//         password: "abc",
//         fullName: "vanlinh",
//         email: "vovanlinhleo1999@gmail.com",
//         avatar: "http://abc.ch"
//       };
//       const res = await chai.request(app).post("/users").send(user);
//       should.exist(res);
//       should.exist(res.body);

//       res.should.have.status(201);
//       res.body.should.be.a("object");
//       res.body.should.have.property("status").eql("PENDING");
//       const users = await UserModel.find({});
//       users.length.should.be.eql(2);

//       const verifies = await VerifyModel.find({});
//       verifies.length.should.be.eql(2);
//       verifies[1].should.have.property("email").eql(user.email);
//     });
//   });
// });
