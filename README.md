# Online Academy

This is a online academy, Back-end is Nodejs, Front-End is ReactJs

---

## Fearture Of This Project

- [Sign In](https://github.com/GithubVanLinh/Online-Academy#sign-in)
- [Get Course Infomation](https://github.com/GithubVanLinh/Online-Academy#get-course-infomation)
- [Get Top 5 Are Same With Course](https://github.com/GithubVanLinh/Online-Academy#get-top-5-are-same-with-course)
- [Get List Lecturer Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-lecturer-of-course)
- [Get List Feedback Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-feedback-of-course)

### Sign In

- Method: `POST /users`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body

  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string",
    "avatar": "url(string)",
    "phone": "number",
    "status": "PENDING | ACTIVE | DELETED",
    "address": "string",
    "fullName": "string"
  }
  ```

- Success Response Body Example

  ```json
  {
    "_id": "string",
    "username": "string",
    "email": "string",
    "avatar": "url(string)",
    "phone": "string",
    "status": "PENDING | ACTIVE | DELETED",
    "createdAt": "date",
    "updatedAt": "date",
    "type": "STUDENT",
    "address": "string",
    "fullName": "string"
  }
  ```

- Failure Response Body Example

  ```json
  {
    "error": "error string"
  }
  ```

### Get Courses

- Method: `GET /courses`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success Response Body Example

  ```json
  [
    {
      "_id": "60b5b8d325c3608c61d1794f",
      "courseName": "Lập trình di động với React Native",
      "courseImage": "url(string)",
      "courseLecturers": [
        "000000000000000000000000",
        "111111111111111111111111"
      ],
      "category": "60b61000183b6963bcb401e6",
      "price": "number",
      "promotionalPrice": "number",
      "briefDescription": "string",
      "detailDescription": "string",
      "soldNumber": "number",
      "ratedNumber": "number",
      "lessionNumber": "number",
      "totalHours": "number",
      "ratingPoint": "number",
      "status": "INCOMPLETE | COMPLETED | DELETED",
      "createdAt": "date",
      "updatedAt": "date",
      "feedbacks": ["000000000000000000000000", "111111111111111111111111"]
    },
    {
      /*...*/
    }
  ]
  ```

### Get Courses By CategoryId

- Method: `GET /courses`
- Query: `categoryId` = categoryId
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success Response Body Example

  ```json
  {
    "docs": [
      {
        "courseLecturers": [
          {
            "avatar": "https://img.com",
            "status": "ACTIVE",
            "teachingCourses": ["60b74a89925c8e4710e90c6c"],
            "_id": "60b745c0925c8e4710e90c6a",
            "username": "robpercival",
            "password": "$2y$10$tweLVlBA1E4m7Kzl14HkJuDTCRJOTf311dthZ9IEtcVcC9fs8ttwq",
            "fullName": "Rob Percival",
            "email": "robpercival@mail.com",
            "address": "string",
            "createdAt": "2021-05-30T05:08:57.918Z",
            "updatedAt": "2021-05-30T05:08:57.918Z",
            "phone": "string",
            "description": "Hi! I'm Rob."
          },
          {
            "avatar": "https://img.com",
            "status": "ACTIVE",
            "teachingCourses": ["60b74a89925c8e4710e90c6c"],
            "_id": "60b74681925c8e4710e90c6b",
            "username": "marcstock",
            "password": "$2y$10$tweLVlBA1E4m7Kzl14HkJuDTCRJOTf311dthZ9IEtcVcC9fs8ttwq",
            "fullName": "Marc Stock",
            "email": "marcstock@mail.com",
            "address": "string",
            "createdAt": "2021-05-30T05:08:57.918Z",
            "updatedAt": "2021-05-30T05:08:57.918Z",
            "phone": "string",
            "description": "I have"
          }
        ],
        "briefDescription": "Learn Android App Development with Android 7 Nougat by building real apps including Uber, Whatsapp and Instagram!",
        "detailDescription": "Please note.",
        "soldNumber": 0,
        "ratedNumber": 0,
        "lessionNumber": 0,
        "totalHours": 0,
        "ratingPoint": 0,
        "status": "INCOMPLETE",
        "feedbacks": [],
        "view": 10,
        "_id": "60b74a89925c8e4710e90c6c",
        "courseName": "The Complete Android N Developer Course",
        "courseImage": "url(string)",
        "category": {
          "isDeleted": false,
          "_id": "60b739cc925c8e4710e90c67",
          "categoryName": "Android Development",
          "level": "MOBILE",
          "createdAt": "2021-05-30T04:08:57.918Z",
          "updatedAt": "2021-05-30T04:08:57.918Z"
        },
        "price": 2000000,
        "promotionalPrice": 350000,
        "createdAt": "2021-06-01T06:21:55.000Z",
        "updatedAt": "2021-06-01T06:21:55.000Z"
      }
    ],
    "totalDocs": 1,
    "limit": 5,
    "totalPages": 1,
    "page": 1,
    "pagingCounter": 1,
    "hasPrevPage": false,
    "hasNextPage": false,
    "prevPage": null,
    "nextPage": null
  }
  ```

### Get Course Information

- Method: `Get /courses/:courseId`
- Status Code:

  - Success: `200`
  - Failure: `400`

- Success Response Body Example

  ```json
  {
    "_id": "60b5b8d325c3608c61d1794f",
    "courseName": "Lập trình di động với React Native",
    "courseImage": "url(string)",
    "courseLecturers": ["000000000000000000000000", "111111111111111111111111"],
    "category": "60b61000183b6963bcb401e6",
    "price": "number",
    "promotionalPrice": "number",
    "briefDescription": "string",
    "detailDescription": "string",
    "soldNumber": "number",
    "ratedNumber": "number",
    "lessionNumber": "number",
    "totalHours": "number",
    "ratingPoint": "number",
    "status": "INCOMPLETE | COMPLETED | DELETED",
    "createdAt": "date",
    "updatedAt": "date",
    "feedbacks": ["000000000000000000000000", "111111111111111111111111"]
  }
  ```

- Failure Response Body Example

  ```json
  {
    "error": "error string"
  }
  ```

### Get Top 5 Are Same With Course

- Method: `GET /statistics/same-course/:courseId`
- Query: `count`= 5
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success Response Body Example

  ```json
  [
    {
      "_id": "60b5b8d325c3608c61d1794f",
      "courseName": "Lập trình di động với React Native",
      "courseImage": "url(string)",
      "courseLecturers": [
        "000000000000000000000000",
        "111111111111111111111111"
      ],
      "category": "60b61000183b6963bcb401e6",
      "price": "number",
      "promotionalPrice": "number",
      "briefDescription": "string",
      "detailDescription": "string",
      "soldNumber": "number",
      "ratedNumber": "number",
      "lessionNumber": "number",
      "totalHours": "number",
      "ratingPoint": "number",
      "status": "INCOMPLETE | COMPLETED | DELETED",
      "createdAt": "date",
      "updatedAt": "date",
      "feedbacks": ["000000000000000000000000", "111111111111111111111111"]
    },
    {
      /*...*/
    }
  ]
  ```

- Failure Response Body Example

  ```json
  {
    "error": "error string"
  }
  ```

### Get List Lecturer Of Course

- Method: `GET /courses/:courseId/lecturers`
- Status Code:

  - Success: `200`
  - Failure: `400`

- Success Response Body Example

  ```json
  [
    {
      "_id": "60b5f74bf17578e8c643fea3",
      "username": "string",
      "password": "string",
      "fullName": "string",
      "email": "string",
      "avatar": "string (url)",
      "address": "string",
      "createdAt": { "$date": "2021-05-30T05:08:57.918Z" },
      "updatedAt": { "$date": "2021-05-30T05:08:57.918Z" },
      "status": "PENDING | ACTIVE | DELETED",
      "phone": "string",
      "description": "string -> about me",
      "teachingCourses": [
        { "_id": "000000000000000000000000" },
        { "_id": "111111111111111111111111" }
      ]
    },
    {
      /*...*/
    }
  ]
  ```

- Failure Response Body Example

  ```json
  {
    "error": "error string"
  }
  ```

### Get List Feedback Of Course

- Method: `GET /courses/:courseId/feedbacks`
- Status Code:

  - Success: `200`
  - Failure: `400`

- Success Response Body Example

  ```json
  [
    {
      "_id": "60b5ba2925c3608c61d17954",
      "userId": "111111111111111111111111",
      "content": "string",
      "ratingPoint": "integer",
      "createdAt": "datetime"
    },
    {
      /*...*/
    }
  ]
  ```

- Failure Response Body Example

  ```json
  {
    "error": "error string"
  }
  ```

### Search API

#### By course name

- Method: `GET /search`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Params:
  - keyword
- Sample:

  ```code
  localhost:8080/search?keyword=react
  ```

### Category API

#### Get all categories

- Method: `GET /categories`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:

  ```code
  http://localhost:8080/categories
  ```
