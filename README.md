# Online Academy
## About:
Online Academy Project: 
- Advanced Web Applications Development's Final Project
- Framework using:
  - Backend: Node.js
  - Frontend: React
- Team members:
  - 1712537 - Phan Tấn Khoa
  - 1712541 - Đinh Gia Kiệt
  - 1712565 - Võ Văn Lình

---

## Fearture Of This Project

- [Sign In](https://github.com/GithubVanLinh/Online-Academy#sign-in)
- [Get Course Infomation](https://github.com/GithubVanLinh/Online-Academy#get-course-infomation)
- [Get Top 5 Are Same With Course](https://github.com/GithubVanLinh/Online-Academy#get-top-5-are-same-with-course)
- [Get List Lecturer Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-lecturer-of-course)
- [Get List Feedback Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-feedback-of-course)
- [Log In API](https://github.com/GithubVanLinh/Online-Academy#log-in-api)
- [Search API](https://github.com/GithubVanLinh/Online-Academy#search-api)

### Sign Up

- Method: `POST /users`
- Status Code:
  - Success: `201`
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
### Log In API
#### User Log In
- Method: `POST /auth/login`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:
  - username
  - password
- Sample:
  ```code
  curl --location --request POST 'localhost:8080/auth/login'
  --header 'Content-Type: application/json' 
  --data-raw '{
  "username":"<username>",
  "password":"<password>"
  }'
  ```
#### User request new accessToken
- Method: `POST /auth/refresh`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:
  - accessToken
  - refreshToken
- Sample:
  ```code
  curl --location --request POST 'localhost:8080/auth/refresh' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "accessToken":"<your-access-token>",
  "refreshToken":"<your-refresh-token>"
  }'
  ```
#### Lecturer Log In
- Method: `POST /lecturers/login`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:
  - username
  - password
- Sample:
  ```code
  curl --location --request POST 'localhost:8080/lecturers/login' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "username": "robpercival",
  "password": "123456"
  }'
  ```
#### Lecturer request new accessToken
- Method: `POST /lecturers/refresh`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:
  - accessToken
  - refreshToken
- Sample:
  ```code
  curl --location --request POST 'localhost:8080/lecturers/refresh' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "accessToken":"<your-access-token>",
  "refreshToken":"<your-refresh-token>"
  }'
  ```

### Search API
#### By course name
- Method: `GET /api/search/course`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Params:
  - keyword
  - page
  - sortBy: ratingDesc / priceAsc
- Sample:
  ```code
  curl --location --request GET 'localhost:8080/api/search/course?keyword=react'
  ```
#### By category
- Method: `GET /api/search/byCategory`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Params:
  - keyword
  - page
  - sortBy: ratingDesc / priceAsc
- Sample:
  ```code
  curl --location --request GET 'localhost:8080/api/search/byCategory?keyword=react'
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

### Course API

#### Get 10 newest courses

- Method: `GET /courses/newestCourses`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:

  ```code
  http://localhost:8080/courses/newestCourses
  ```
- Success response:
  ```json
  [
    {
      "_id": "60b5b8d325c3608c61d1794f",
      "courseName": "Lập trình di động với React Native",
      "courseImage": "url(string)",
      "courseLecturers": ["000000000000000000000000"],
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
      "feedbacks": ["000000000000000000000000"],
      "view": 0
    }
  ]
  ```
#### Get 10 most viewed courses

- Method: `GET /courses/mostViewedCourses`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:

  ```code
  http://localhost:8080/courses/mostViewedCourses
  ```
- Success response:
  ```json
  [
    {
      "_id": "60b5b8d325c3608c61d1794f",
      "courseName": "Lập trình di động với React Native",
      "courseImage": "url(string)",
      "courseLecturers": ["000000000000000000000000"],
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
      "feedbacks": ["000000000000000000000000"],
      "view": 0
    }
  ]
  ```
#### Get 3 featured course of the week

- Method: `GET /courses/featuredCourses`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:

  ```code
  http://localhost:8080/courses/featuredCourses
  ```
- Success response:
  ```json
  [
    {
      "courseLecturers": [
        {
          "_id": "60b754e4a651451b6f25b382",
          "fullName": "Jonas Schmedtmann"
        }
      ],
      "ratedNumber": 0,
      "ratingPoint": 0,
      "_id": "60b759f3a651451b6f25b38e",
      "courseName": "Build Responsive Real World Websites with HTML5 and CSS3",
      "courseImage": "url(string)",
      "category": {
        "_id": "60b73962a651451b6f25b375",
        "categoryName": "CSS"
      },
      "price": 0,
      "promotionalPrice": 0
    }
  ]
  ```

#### Get list of featured category of the week

- Method: `GET /categories/featuredCategories`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:

  ```code
  http://localhost:8080/categories/featuredCategories
  ```
- Success response:
  ```json
  [
    {
      "_id": "60b73923a651451b6f25b374",
      "categoryName": "React"
    }
  ]
  ```

### User API
#### Update user information

- Method: `PATCH /users/:userId`
- Params: 
  - userId: a string contains 24 charaters
- Status Code:
  - Success: `200`
  - No content:  `204`
  - Failure: `400`, `500`
- Sample:

  ```code
  http://localhost:8080/users/60b8d2958e620084208eb793
  ```
- Success response:
  ```json
  {
    "fullName": "Phan Tan Khoa",
    "phone": "0937646422",
    "address": "TP Ho Chi Minh",
    "updatedAt": "2021-06-03T13:01:03.808Z"
  }
  ```
#### Change user password

- Method: `PATCH /users/:userId/password`
- Params: 
  - userId: a string contains 24 charaters
- Body: 
  - currentPassword
  - newPassword
- Status Code:
  - Success: `200`
  - Failure: `400`, `500`
- Sample:

  ```code
  http://localhost:8080/users/60b9d65d0ab2a19495ec1211/password
  ```
- Success response:
  ```json
  {
    "_id": "60b9d65d0ab2a19495ec1211",
    "username": "giakiet99",
    "password": "$2a$10$f4CzzqFuHOJJkk6YrpigXuJEdswzj0U.XprYl.dmNEGn06abrqV3S"
  }
  ```
