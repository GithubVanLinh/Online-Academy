# Online Academy

This is a online academy, Back-end is Nodejs, Front-End is ReactJs

---

## Fearture Of This Project

- [Sign In](https://github.com/GithubVanLinh/Online-Academy#sign-in)
- [Get Course Infomation](https://github.com/GithubVanLinh/Online-Academy#get-course-infomation)

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
- Params: `count`= 5
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
