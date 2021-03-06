"use strict";
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv();
addFormats(ajv);

ajv.addFormat("phone", /^0[0-9]{9}$/);

const registerSchema = require("../utils/schemas/register_student.schema.json");
const updateSchema = require("../utils/schemas/user.schema.json");
const validateSchema = require("../utils/schemas/validate_student.schema.json");
const loginSchema = require("../utils/schemas/login.schema.json")
const updateUserInfoSchema = require("../utils/schemas/update_user_info.schema.json");
const updateUserPasswordSchema = require("../utils/schemas/update_user_password.schema.json");
const updateUserEmail = require("../utils/schemas/update_user_email.schema.json");
const enrollmentSchema = require("../utils/schemas/enrollment.schema.json");
const progressSchema = require("../utils/schemas/progress.schema.json");
const feedbackSchema = require("../utils/schemas/send_feedback.schema.json");
const categorySchema = require("../utils/schemas/category.schema.json");
const newCourseSchema = require("../utils/schemas/new_course.schema.json");
const newSectionSchema = require("../utils/schemas/new_section.schema.json");
const updateDescriptionSchema = require("../utils/schemas/update_course_description.schema.json");
const newLessonSchema = require("../utils/schemas/new_lesson.schema.json");
const createLecturerSchema = require("../utils/schemas/lecturer.schema.json");
const updateBasicCourseInfoSchema = require("../utils/schemas/update_course.schema.json");

ajv.addSchema(registerSchema, "register_student");
ajv.addSchema(updateSchema, "user");
ajv.addSchema(validateSchema, "validate_student");
ajv.addSchema(loginSchema, "login");
ajv.addSchema(updateUserInfoSchema, "update_user_info");
ajv.addSchema(updateUserPasswordSchema, "update_user_password");
ajv.addSchema(updateUserEmail, "update_user_email");
ajv.addSchema(enrollmentSchema, "enrollment");
ajv.addSchema(progressSchema, "progress");
ajv.addSchema(feedbackSchema, "send_feedback");
ajv.addSchema(categorySchema, "category");
ajv.addSchema(newCourseSchema, "new_course");
ajv.addSchema(newSectionSchema, "new_section");
ajv.addSchema(updateDescriptionSchema, "update_description");
ajv.addSchema(newLessonSchema, "new_lesson");
ajv.addSchema(createLecturerSchema, "create_lecturer");
ajv.addSchema(updateBasicCourseInfoSchema, "update_basic_course_info");

module.exports = ajv;
