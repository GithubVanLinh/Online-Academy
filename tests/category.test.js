"use strict";

process.env.NODE_ENV = "test";

// const mongoose = require("mongoose");
// const Book = require("../app/models/book");
const CategoryModel = require("../models/category.model");

const sample = require("./sample");

const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const courseModel = require("../models/course.model");
const should = chai.should();

chai.use(chaiHttp);

describe("#Category", async () => {
  before(async () => {
    await require("../configs/db.config");
  });

  beforeEach(async () => {
    for (let i = 0; i < sample.categories.length; i++) {
      await CategoryModel.create(sample.categories[i]);
    }
    for (let i = 0; i < sample.courses.length; i++) {
      await courseModel.create(sample.courses[i]);
    }
  });
  afterEach(async () => {
    await courseModel.deleteMany({}, {});
    await CategoryModel.deleteMany({}, {});
  });

  describe("#Get All category", async () => {
    it("it should get all category", async () => {
      const res = await chai.request(app).get("/categories");
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.web.length.should.have.eql(2);
      res.body.mobile.length.should.have.eql(0);
    });
  });

  describe("#Get category detail", async () => {
    it("it should detail of the category", async () => {
      const res = await chai
        .request(app)
        .get(`/categories/${sample.categories[0]._id}`);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have
        .property("categoryName")
        .eql(sample.categories[0].categoryName);
    });

    it("it should error when wrongs id", async () => {
      const res = await chai
        .request(app)
        .get(`/categories/${sample.categories[0]._id}2`);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("error_message").eql("invalid categoryId");
    });
  });

  describe("#Add category", async () => {
    it("it should add category success", async () => {
      const body = {
        categoryName: "test",
        level: "WEB"
      };

      const res = await chai.request(app).post("/categories").send(body);
      should.exist(res);
      should.exist(res.body);

      // check response success
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("categoryName").eql(body.categoryName);

      // check database added 1
      const categories = await CategoryModel.find({});
      categories.length.should.have.eql(3);

      // check added item
      categories[2].should.have.property("categoryName").eql(body.categoryName);
    });

    it("it should error when categoryName and level exists", async () => {
      const body = {
        categoryName: sample.categories[0].categoryName,
        level: sample.categories[0].level
      };

      const res = await chai.request(app).post("/categories").send(body);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(400);
      res.body.should.be.a("object");

      // check database not change
      const categories = await CategoryModel.find({});
      categories.length.should.have.eql(2);
    });

    it("it should error when wrongs level", async () => {
      const body = {
        categoryName: sample.categories[0].categoryName,
        level: "w3b"
      };

      const res = await chai.request(app).post("/categories").send(body);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(400);
      res.body.should.be.a("object");

      // check database not change
      const categories = await CategoryModel.find({});
      categories.length.should.have.eql(2);
    });
  });

  describe("#Delete Category", async () => {
    it("it should delete category", async () => {
      const res = await chai
        .request(app)
        .delete(`/categories/${sample.categories[1]._id}`);
      should.exist(res);
      should.exist(res.body);
      console.log("body", res.body);
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("category has removed");

      // check in database
      const category = await CategoryModel.findById(sample.categories[1]._id);
      console.log("category", category);
      should.exist(category);
      category.should.have.property("isDeleted").eql(true);
    });

    it("it should error when wrongs id", async () => {
      const res = await chai
        .request(app)
        .delete(`/categories/${sample.categories[1]._id}2`);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("error_message").eql("invalid categoryId");
    });

    it("it should error when has course", async () => {
      const res = await chai
        .request(app)
        .delete(`/categories/${sample.categories[0]._id}`);
      should.exist(res);
      should.exist(res.body);

      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have
        .property("error_message")
        .eql("category have courses");

      // check in database
      const category = await CategoryModel.findById(sample.categories[0]._id);
      should.exist(category);
      category.should.have.property("isDeleted").eql(false);
    });
  });

  describe("#Update Category", async () => {
    it("it should update category success", async () => {
      const body = {
        categoryName: "change",
        level: "WEB"
      };
      const res = await chai
        .request(app)
        .patch(`/categories/${sample.categories[1]._id}`)
        .send(body);
      should.exist(res);
      should.exist(res.body);

      console.log(res.body);
      // check response success
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("categoryName").eql(body.categoryName);

      // check in database
      const category = await CategoryModel.findById(sample.categories[1]._id);
      console.log("category", category);
      should.exist(category);
      category.should.have.property("categoryName").eql(body.categoryName);
    });

    it("it should error when wrongs id", async () => {
      const res = await chai
        .request(app)
        .patch(`/categories/${sample.categories[1]._id}2`);
      should.exist(res);
      should.exist(res.body);

      console.log(res.body);
      res.should.have.status(404);
      res.body.should.be.a("object");
      res.body.should.have.property("error_message").eql("invalid categoryId");
    });

    it("it should error when categoryName and level exists", async () => {
      const body = {
        categoryName: sample.categories[0].categoryName,
        level: sample.categories[0].level
      };
      const res = await chai
        .request(app)
        .patch(`/categories/${sample.categories[1]._id}`)
        .send(body);
      should.exist(res);
      should.exist(res.body);

      console.log(res.body);
      // check response success
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("error_message");

      // check in database
      const category = await CategoryModel.findById(sample.categories[1]._id);
      should.exist(category);
      category.should.have.property("categoryName").eql(sample.categories[1].categoryName);
    });

    it("it should error when wrong level", async () => {
      const body = {
        categoryName: sample.categories[0].categoryName,
        level: "kk"
      };
      const res = await chai
        .request(app)
        .patch(`/categories/${sample.categories[1]._id}`)
        .send(body);
      should.exist(res);
      should.exist(res.body);

      console.log(res.body);
      // check response success
      res.should.have.status(400);
      res.body.should.be.a("object");
      res.body.should.have.property("error");

      // check in database
      const category = await CategoryModel.findById(sample.categories[1]._id);
      should.exist(category);
      category.should.have.property("categoryName").eql(sample.categories[1].categoryName);
      category.should.have.property("level").eql(sample.categories[1].level);
    });
  });
});
