"use strict";

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
  wishList: [],
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
  courseLecturers: [],
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
  courseLecturers: [],
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
  userId: "",
  courseId: "",
  registeredTime: "2021-06-03T06:10:57.918Z"
};

const enroll2 = {
  _id: "60b8d370b15d1bfb4ada84ea",
  userId: "",
  courseId: "",
  registeredTime: "2021-06-03T06:10:57.918Z"
};

const lecturer1 = {
  _id: "60b745c0925c8e4710e90c6a",
  username: "robpercival",
  password: "$2y$10$tweLVlBA1E4m7Kzl14HkJuDTCRJOTf311dthZ9IEtcVcC9fs8ttwq",
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
  teachingCourses: [],
  rfToken:
    "NRxCUvG8NxRvjg43q5A1jdYY5rKFrI5k9MzeoQLcCTq4EClFntLzyeWertMAZ9GgeRMeEk0iEx3HVHvO"
}

const lecturer2 = {
  _id: "60b745c0925c8e4710e80c6a",
  username: "robpercivall",
  password: "$2y$10$tweLVlBA1E4m7Kzl14HkJuDTCRJOTf311dthZ9IEtcVcC9fs8ttwq",
  fullName: "Rob",
  email: "robperci@mail.com",
  avatar:
    "https://img-c.udemycdn.com/user/75x75/4387876_78bc.jpg?Expires=1622703883&Signature=dvKY8Rv40q-qRoAoJX5-0Q~lXB7ZytOP4xzUc6doHO7XqD53-Klv2SGkWztyQE42dSKhrCuSz~kWNTE5UTRfbjKpqpKWWiVsLiwDuOCEiMAUau2vbEYmX7j8PrluRkUtw-3ZK~meDox1PNCDSM8Mtp23Xad-FygypYboVyDdPzKheFrHLkyWkOzvXOvIOC0zm~ANkHwVxgXpAYk-YT8EhuDP0GTTk9e7f4GtvWSAinTEkahhIgqvx9Dp2-SqDo7wSloN-KZAfN7EGr~CgQkn5ptnMU80ya4XoCEk2FBZdPoI~BuuHnXQtV1122qNWq9iJ~nXe-dXCvoE4lYSghcGLQ__&Key-Pair-Id=APKAITJV77WS5ZT7262A",
  address: "string",
  createdAt: "2021-05-30T05:08:57.918Z",
  updatedAt: "2021-05-30T05:08:57.918Z",
  status: "ACTIVE",
  phone: "string",
  description: "Hi! I'm Rob. I have a degree in Mathematics from",
  teachingCourses: [],
  rfToken:
    "NRxCUvG8NxRvjg43q5A1jdYY5rKFrI5k9MzeoQLcCTq4EClFntLzyeWertMAZ9GgeRMeEk0iEx3HVHvO"
}

const admin1 = {
  _id: "60b8d2958e620084208ebe83",
  username: "admin1",
  password: "$2b$10$BzyKBuWNNnPZ.xi2UGnx/elzl.GA.yK/igpTSLQYp.5ohcDgzuwQS",
  email: "test3@a.c",
  fullName: "Phan Tan Khoa",
  createdAt: "2021-06-03T13:01:03.808Z",
  updatedAt: "2021-06-04T07:33:30.549Z",
  rfToken:
    "a6NiCbIayUa6CWJ8rzwX2ZpWZJwzojkvCOQNAZHxohUPCXpn9HSoENw8qwg7zVHcgvm3OTm2HExNd9sK"
};

const admin2 = {
  _id: "60b8d2958e620085308ebe83",
  username: "admin2",
  password: "$2b$10$BzyKBuWNNnPZ.xi2UGnx/elzl.GA.yK/igpTSLQYp.5ohcDgzuwQS",
  email: "test6@a.c",
  fullName: "Phan Tan Khoa",
  createdAt: "2021-06-03T13:01:03.808Z",
  updatedAt: "2021-06-04T07:33:30.549Z",
  rfToken:
    "a6NiCbIayUa6CWJ8rzwX2ZpWZJwzojkvCOQNAZHxohUPCXpn9HSoENw8qwg7zVHcgvm3OTm2HExNd9sK"
};


// ref
user1.wishList.push(course1._id, course2._id);
user2.wishList.push(course2._id);

course1.courseLecturers.push(lecturer1._id, lecturer2._id);
course2.courseLecturers.push(lecturer1._id)

lecturer1.teachingCourses.push(course1._id, course2._id);
lecturer2.teachingCourses.push(course1._id);

enroll1.courseId = course1._id;
enroll1.userId = user1._id;
enroll2.courseId = course1._id;
enroll2.userId = user2._id;

module.exports = {
  users: [user1, user2],
  lecturers: [lecturer1, lecturer2],
  courses: [course1, course2],
  enrollments: [enroll1, enroll2],
  verifies: [],
  admins: [admin1, admin2]
}