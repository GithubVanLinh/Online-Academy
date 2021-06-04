"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const UserModel = require("../models/user.model");
const CoursesModel = require("../models/course.model");
const CategoryModel = require("../models/category.model");
const LecturerModel = require("../models/lecturer.model");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

describe("Courses", () => {
  beforeEach((done) => {
    CoursesModel.create(
      {
        _id: "60b748b2a651451b6f25b377",
        courseName:
          "React - The Complete Guide (incl Hooks, React Router, Redux)",
        courseImage: "url(string)",
        courseLecturers: ["60b74346a651451b6f25b376"],
        category: "60b73923a651451b6f25b374",
        price: 100000,
        promotionalPrice: 10,
        briefDescription:
          "Dive in and learn React.js from scratch! Learn Reactjs,",
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
      },
      (err, doc) => {
        CoursesModel.create(
          {
            _id: "60b74a89925c8e4710e90c6c",
            courseName: "The Complete Android N Developer Course",
            courseImage: "url(string)",
            courseLecturers: [
              "60b745c0925c8e4710e90c6a",
              "60b74681925c8e4710e90c6b"
            ],
            category: "60b739cc925c8e4710e90c67",
            price: 2000000,
            promotionalPrice: 350000,
            briefDescription: "Learn Android App Development with Android 7",
            detailDescription: "Please note support for this course",
            soldNumber: 0,
            ratedNumber: 0,
            lessionNumber: 0,
            totalHours: 0,
            ratingPoint: 0,
            status: "INCOMPLETE",
            createdAt: "2021-06-01T06:21:55.000Z",
            updatedAt: "2021-06-01T06:21:55.000Z",
            feedbacks: [],
            view: 10
          },
          (err, doc) => {
            CategoryModel.create(
              {
                _id: "60b73923a651451b6f25b374",
                categoryName: "React",
                level: "WEB",
                isDeleted: false,
                createdAt: "2021-05-30T04:08:57.918Z",
                updatedAt: "2021-05-30T04:08:57.918Z"
              },
              (err, doc) => {
                CategoryModel.create(
                  {
                    _id: "60b739cc925c8e4710e90c67",
                    categoryName: "Android Development",
                    level: "MOBILE",
                    isDeleted: false,
                    createdAt: "2021-05-30T04:08:57.918Z",
                    updatedAt: "2021-05-30T04:08:57.918Z"
                  },
                  (err, doc) => {
                    done();
                  }
                );
              }
            );
          }
        );
      }
    );
  });

  beforeEach((done) => {
    LecturerModel.create(
      {
        _id: "60b74346a651451b6f25b376",
        username: "lecturer1",
        password:
          "$2b$10$nmHFZwfDrHWZPbWVLJ.XIuxzPmLa.iN7eYKxuaip/RythHf2wWauq",
        fullName: "Maximilian Schwarzmüller",
        email: "1@gmail.com",
        avatar: "string (url)",
        address: "Viet Nam",
        createdAt: "2021-05-30T05:09:57.918Z",
        updatedAt: "2021-05-30T05:09:57.918Z",
        status: "ACTIVE",
        phone: "0123456789",
        description:
          "Starting out at the age of 13 I never stopped learning new",
        teachingCourses: ["60b748b2a651451b6f25b377"]
      },
      (err, doc) => {
        LecturerModel.create(
          {
            _id: "60b745c0925c8e4710e90c6a",
            username: "robpercival",
            password:
              "$2y$10$tweLVlBA1E4m7Kzl14HkJuDTCRJOTf311dthZ9IEtcVcC9fs8ttwq",
            fullName: "Rob Percival",
            email: "robpercival@mail.com",
            avatar:
              "https://img-c.udemycdn.com/user/75x75/4387876_78bc.jpg?Expires=1622703883&Signature=dvKY8Rv40q-qRoAoJX5-0Q~lXB7ZytOP4xzUc6doHO7XqD53-Klv2SGkWztyQE42dSKhrCuSz~kWNTE5UTRfbjKpqpKWWiVsLiwDuOCEiMAUau2vbEYmX7j8PrluRkUtw-3ZK~meDox1PNCDSM8Mtp23Xad-FygypYboVyDdPzKheFrHLkyWkOzvXOvIOC0zm~ANkHwVxgXpAYk-YT8EhuDP0GTTk9e7f4GtvWSAinTEkahhIgqvx9Dp2-SqDo7wSloN-KZAfN7EGr~CgQkn5ptnMU80ya4XoCEk2FBZdPoI~BuuHnXQtV1122qNWq9iJ~nXe-dXCvoE4lYSghcGLQ__&Key-Pair-Id=APKAITJV77WS5ZT7262A",
            address: "string",
            createdAt: "2021-05-30T05:08:57.918Z",
            updatedAt: "2021-05-30T05:08:57.918Z",
            status: "ACTIVE",
            phone: "string",
            description: "Hi! I'm Rob. I have a degree in Mathematics from",
            teachingCourses: ["60b74a89925c8e4710e90c6c"],
            rfToken:
              "NRxCUvG8NxRvjg43q5A1jdYY5rKFrI5k9MzeoQLcCTq4EClFntLzyeWertMAZ9GgeRMeEk0iEx3HVHvO"
          },
          (err, doc) => {
            LecturerModel.create(
              {
                _id: "60b74681925c8e4710e90c6b",
                username: "marcstock",
                password:
                  "$2y$10$tweLVlBA1E4m7Kzl14HkJuDTCRJOTf311dthZ9IEtcVcC9fs8ttwq",
                fullName: "Marc Stock",
                email: "marcstock@mail.com",
                avatar:
                  "https://img-c.udemycdn.com/user/200_H/9849986_e1a5_2.jpg?Expires=1622710094&Signature=gxadtXF3Cc5L9OGfph9ehCdruB52nljY16w~7mOXQuhiRC9FII0361KiNlrakoJWUID7nf3XlUUAo1pqrMYR3GaP~-YqwHjFy60ZEjpVI-uIvVffyNriZPSD8jpeV39JLJjMAEmOd0s9mcXufvhVFUrYNWyKM06oswwfX1omHoSCxBsic826Mtf3NfwFAWW9N-8bRF782Yr5Pm5uk9aSiFE2UpfBvXfiHx8DjEj5qgMrx~CRV47kTwS6rcuPqEutTm5KIayWFt8NiR1IcdRCoU8Rc7F9XeWZI1MV5cKvxideISJNK7gO73WJs7wc8Or6DyZmNMkdILsgdUffjr88Tw__&Key-Pair-Id=APKAITJV77WS5ZT7262A",
                address: "string",
                createdAt: "2021-05-30T05:08:57.918Z",
                updatedAt: "2021-05-30T05:08:57.918Z",
                status: "ACTIVE",
                phone: "string",
                description: "I have been a Mobile Game App Designer, Author",
                teachingCourses: ["60b74a89925c8e4710e90c6c"]
              },
              (err, doc) => {
                done();
              }
            );
          }
        );
      }
    );
  });

  afterEach((done) => {
    CoursesModel.deleteMany({}, {}, (err) => {
      CategoryModel.deleteMany({}, {}, (err) => {
        LecturerModel.deleteMany({}, {}, (err) => {
          done();
        });
      });
    });
  });

  describe("/GET ", () => {
    it("it should GET all the courses", (done) => {
      chai
        .request(app)
        .get("/courses")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.docs.should.be.a("array");
          res.body.docs.length.should.be.eql(2);
          res.body.docs[0].should.have
            .property("courseName")
            .eql(
              "React - The Complete Guide (incl Hooks, React Router, Redux)"
            );
          done();
        });
    });

    it("it should GET the course have Id", (done) => {
      chai
        .request(app)
        .get("/courses/60b748b2a651451b6f25b377")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("_id")
            .eql(
              "60b748b2a651451b6f25b377"
            );
          done();
        });
    });

    it("it should list lecturer of the course", (done) => {
      chai
        .request(app)
        .get("/courses/60b74a89925c8e4710e90c6c/lecturers")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(2);
          res.body[0].should.have
            .property("_id")
            .eql(
              "60b745c0925c8e4710e90c6a"
            );
          done();
        });
    });

    it("it should list feedback of the course", (done) => {
      chai
        .request(app)
        .get("/courses/60b74a89925c8e4710e90c6c/feedbacks")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          should.exist(res.body);
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
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

describe("Users", () => {
  beforeEach((done) => {
    UserModel.deleteMany({}, {}, (err) => {
      done();
    });
  });

  describe("/POST ", () => {
    it("it should create a student", (done) => {
      const user = {
        username: "abc",
        password: "abc",
        fullName: "vanlinh",
        email: "vovanlinhleo1999@gmail.com",
        avatar: "http://abc.ch"
      };
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          should.exist(res.body);

          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("status").eql("PENDING");
          done();
        });
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
