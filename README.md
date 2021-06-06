# Online Academy

## About

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

- [User API](https://github.com/GithubVanLinh/Online-Academy#user-api)
    - [Sign In](https://github.com/GithubVanLinh/Online-Academy#sign-up)
    - [User Log In](https://github.com/GithubVanLinh/Online-Academy#user-log-in)
    - [User request new accessToken](https://github.com/GithubVanLinh/Online-Academy#user-request-new-accesstoken)
    - [Update user information](https://github.com/GithubVanLinh/Online-Academy#update-user-information)
    - [Create change user email verification](https://github.com/GithubVanLinh/Online-Academy#create-change-user-email-verification)
    - [Verify email to change user email](https://github.com/GithubVanLinh/Online-Academy#verify-email-to-change-user-email)
    - [Change user password](https://github.com/GithubVanLinh/Online-Academy#change-user-password)
    - [Add a course to Wishlist](https://github.com/GithubVanLinh/Online-Academy#add-a-course-to-wishlist)

- [Lecturer API](https://github.com/GithubVanLinh/Online-Academy#lecturer-api)
    - [Lecturer Log In](https://github.com/GithubVanLinh/Online-Academy#lecturer-log-in)
    - [Lecturer request new accessToken](https://github.com/GithubVanLinh/Online-Academy#lecturer-request-new-accesstoken)

- [Course API](https://github.com/GithubVanLinh/Online-Academy#course-api)
    - [Get Courses](https://github.com/GithubVanLinh/Online-Academy#get-courses)
    - [Get Courses By CategoryId](https://github.com/GithubVanLinh/Online-Academy#get-courses-by-categoryid)
    - [Get Course Infomation](https://github.com/GithubVanLinh/Online-Academy#get-course-information)
    - [Get List Lecturer Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-lecturer-of-course)
    - [Get List Feedback Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-feedback-of-course)
    - [Send feedback](https://github.com/GithubVanLinh/Online-Academy#send-feedback)
  
- [Search API](https://github.com/GithubVanLinh/Online-Academy#search-api)
    - [Search By course name](https://github.com/GithubVanLinh/Online-Academy#search-by-course-name)
    - [Search By category name](https://github.com/GithubVanLinh/Online-Academy#search-by-category-name)
  
- [Category API](https://github.com/GithubVanLinh/Online-Academy#category-api)
    - [Get all categories](https://github.com/GithubVanLinh/Online-Academy#get-all-categories)
  
- [Statistic API](https://github.com/GithubVanLinh/Online-Academy#statistic-api)
    - [Get Top 5 Are Same With Course](https://github.com/GithubVanLinh/Online-Academy#get-top-5-are-same-with-course)
    - [Get 10 newest courses](https://github.com/GithubVanLinh/Online-Academy#get-10-newest-courses)
    - [Get 10 most viewed courses](https://github.com/GithubVanLinh/Online-Academy#get-10-most-viewed-courses)
    - [Get 3 featured course of the week](https://github.com/GithubVanLinh/Online-Academy#get-3-featured-course-of-the-week)
    - [Get list of featured category of the week](https://github.com/GithubVanLinh/Online-Academy#get-list-of-featured-category-of-the-week)

### User API

#### Sign Up

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
    "error-string": "error string"
  }
  ```

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
- Success Response:
  ```json
  {
    "authenticated": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI4ZDI5NThlNjIwMDg0MjA4ZWI3OTMiLCJpYXQiOjE2MjI4Nzk5NzcsImV4cCI6MTYyMjg4MDU3N30.-XiSjCwG1_FuPux_2wdJOYsGOWQpYwuFq3OpkQU8L4w",
    "refreshToken": "gIJzJW6C5AiBsgowg8uAI6j2LVarV9j52nxumB8BY3pyGHIvV6Y3OldUsGKAMhp6rhVqjJLhivmdCman"
  }
  ```
- Fail Response:
  ```json
  {
    "authenticated": false
  }
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
- Success Resonse Sample:
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI3NDVjMDkyNWM4ZTQ3MTBlOTBjNmEiLCJpYXQiOjE2MjI4ODAzMjgsImV4cCI6MTYyMjg4MDkyOH0.dLBhJbnI3RCvYEAYxCswBNl6FLaYU0cRqORPflTSPN8"
  }
  ```
#### Update user information

- Method: `PATCH /users/:userId`
- Params:
    - userId: a string contains 24 charaters
- Body:
    - fullName
    - phone
    - address
- Status Code:
    - Success: `200`
    - Failure: `400`
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
- Failed response:
  ```json
  {
    "error": "user not found"
  }
  ```

#### Send change user email request

- Method: `POST /users/:userId/email`
- Params:
    - userId: a string contains 24 charaters
- Body:
    - email
- Status Code:
    - Success: `200`
    - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/users/60b9d65d0ab2a19495ec1211/email
  ```
- Success response:
  ```json
  {
    "message": "verify your email"
  }
  ```
- Failed response:
  ```json
  {
    "error": "email is already taken"
  }
  ```
  ```json
  {
    "error": "user not found"
  }
  ```

- Failed response:

  ```json
  {
    "error": "email is already taken"
  }
  ```

#### Verify email to change user email

- Method: `POST /users/:userId/verify`
- Params:
    - userId: a string contains 24 charaters
- Body:
    - email
    - key
- Status Code:
    - Success: `200`
    - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/users/60b9d65d0ab2a19495ec1211/verify
  ```
- Success response:
  ```json
  {
    "_id": "60b9d65d0ab2a19495ec1211",
    "email": "kietdg99@gmail.com",
    "updatedAt": "2021-06-05T03:34:29.801Z"
  }
  ```
- Failed response:
  ```json
  {
    "error": "incorrect email or key"
  }
  ```
  ```json
  {
    "error": "user not found"
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
    - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/users/60b9d65d0ab2a19495ec1211/password
  ```
- Success response:
  ```json
  {
    "_id": "60b9d65d0ab2a19495ec1211",
    "username": "giakiet99",
    "password": "$2a$10$Asdidz/DEbdsqrYCLEt1AOC/p.jO/KSLMR6sL9iNO.IODHHswMtyK"
  }
  ```
- Failed response:
  ```json
  {
    "error": "Incorrect password"
  }
  ```
  ```json
  {
    "error": "User not found"
  }
  ```
#### Get user wish list

- Method: `GET /users/:userId/wishList`
- Params:
    - userId: a string contains 24 charaters
- Status Code:
    - Success: `200`
    - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/users/60b9d65d0ab2a19495ec1211/wishList
  ```
- Success response:
  ```json
  [
    {
      "courseLecturers": [
        {
          "_id": "60b74346a651451b6f25b376",
          "fullName": "Maximilian Schwarzmüller"
        }
      ],
      "ratedNumber": 0,
      "ratingPoint": 0,
      "_id": "60b748b2a651451b6f25b377",
      "courseName": "React - The Complete Guide (incl Hooks, React Router, Redux)",
      "courseImage": "url(string)",
      "category": {
        "_id": "60b73923a651451b6f25b374",
        "categoryName": "React"
      },
      "price": 100000,
      "promotionalPrice": 10
    }
  ]
  ```
- Failed response:
  ```json
  {
    "error": "user not found"
  }
  ```

#### Delete courses from wish list

- Method: `PATCH /users/:userId/wishList`
- Params:
    - userId: a string contains 24 charaters
- Body:
    - courseIds: array of course id
- Status Code:
    - Success: `200`
    - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/users/60b9d65d0ab2a19495ec1211/wishList
  ```
- Success response:
  ```json
  [
    {
      "courseLecturers": [
        {
          "_id": "60b74346a651451b6f25b376",
          "fullName": "Maximilian Schwarzmüller"
        }
      ],
      "ratedNumber": 0,
      "ratingPoint": 0,
      "_id": "60b748b2a651451b6f25b377",
      "courseName": "React - The Complete Guide (incl Hooks, React Router, Redux)",
      "courseImage": "url(string)",
      "category": {
        "_id": "60b73923a651451b6f25b374",
        "categoryName": "React"
      },
      "price": 100000,
      "promotionalPrice": 10
    }
  ]
  ```
- Failed response:
  ```json
  {
    "error": "user not found"
  }
  ```

#### Get registered course of user

- Method: `GET /users/:userId/registeredList`
- Params:
    - userId: a string contains 24 charaters
- Status Code:
    - Success: `200`
    - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/users/60b9d65d0ab2a19495ec1211/registeredList
  ```
- Success response:
  ```json
  [
    {
      "courseLecturers": [
        {
          "_id": "60b74346a651451b6f25b376",
          "fullName": "Maximilian Schwarzmüller"
        }
      ],
      "ratedNumber": 0,
      "ratingPoint": 0,
      "_id": "60b748b2a651451b6f25b377",
      "courseName": "React - The Complete Guide (incl Hooks, React Router, Redux)",
      "courseImage": "url(string)",
      "category": {
        "_id": "60b73923a651451b6f25b374",
        "categoryName": "React"
      },
      "price": 100000,
      "promotionalPrice": 10
    }
  ]
  ```
- Failed response:
  ```json
  {
    "error": "user not found"
  }
  ```
#### Add A Course to WishList
- Method: `POST /:userId/wishList`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:
  - username
  - password
- Sample:

  ```code
  curl --location --request POST 'localhost:8080/users/60b8d2958e620084208eb793/wishlist' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "courseId": "60b748b2a651451b6f25b377"
  }'
  ```
- Success Response:
  ```json
  [
  "60b74a89925c8e4710e90c6c",
  "60b74a89925c8e4710e90c6f",
  "60b748b2a651451b6f25b377"
  ]
  ```
### Lecturer API

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
- Success Response:
  ```json
  {
    "authenticated": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI3NDVjMDkyNWM4ZTQ3MTBlOTBjNmEiLCJpYXQiOjE2MjI4ODAyNTAsImV4cCI6MTYyMjg4MDg1MH0.qEWIR6TSns8GKzvFL-XgnMtSqLSZ4XdH89TFx6w6Yys",
    "refreshToken": "dGJiIc9KbgLDxjnQaV1KmGmQFzzEZDl9cBEf2j6curZdWlYnPxJaNvwcZVXUQRSPl9bFFjKU710di2xR"
  }
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
- Success Response:
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGI3NDVjMDkyNWM4ZTQ3MTBlOTBjNmEiLCJpYXQiOjE2MjI4ODAzMjgsImV4cCI6MTYyMjg4MDkyOH0.dLBhJbnI3RCvYEAYxCswBNl6FLaYU0cRqORPflTSPN8"
  }
  ```
### Course API

#### Get Courses

- Method: `GET /courses`
- Query:
    - `categoryId`: search course by categoryId
    - `page`: page number. Eachpage limit 5 result
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
    "error-string": "error string"
  }
  ```

#### Get Courses By CategoryId

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

- Failure Response Body Example

  ```json
  {
    "error-string": "error string"
  }
  ```

#### Get Course Information

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
    "error-string": "error string"
  }
  ```

#### Get List Lecturer Of Course

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
    "error-string": "error string"
  }
  ```

#### Get List Feedback Of Course

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
    "error-string": "error string"
  }
  ```
#### Send feedback
- Method: `POST /users/:userId/feedback`
- Params:
  - userId
- Body:
  - courseId
  - content
  - ratingPoint
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:
  ```code
  curl --location --request POST 'localhost:8080/courses/60b748b2a651451b6f25b377/feedback' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "userId": "60b8d2958e620084208eb793",
  "content":"nice course for learning react",
  "ratingPoint": 8
  }'
  ```
- Success Response:
  ```json
  {
    "userId": "60b8d2958e620084208eb793",
    "content": "nice course for learning react",
    "ratingPoint": 8,
    "createdAt": 1622900554039
  }
  ```
### Search API

#### Search By course name

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
  curl --location --request GET 'localhost:8080/api/search/course?keyword=ios'
  ```
- Success Response Example
  ```json
  [
    {
        "courseLecturers": [
            "60b755c0925c8e4710e90c70"
        ],
        "briefDescription": "From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!",
        "detailDescription": "detailDescription string",
        "soldNumber": 0,
        "ratedNumber": 0,
        "lessionNumber": 0,
        "totalHours": 0,
        "ratingPoint": 1,
        "status": "INCOMPLETE",
        "feedbacks": [],
        "view": 7,
        "_id": "60b75654925c8e4710e90c71",
        "courseName": "iOS & Swift - The Complete iOS App Development Bootcamp",
        "courseImage": "url(string)",
        "category": {
            "isDeleted": false,
            "_id": "60b73b2d925c8e4710e90c69",
            "categoryName": "iOS Development",
            "level": "MOBILE",
            "createdAt": "2021-05-30T04:08:57.918Z",
            "updatedAt": "2021-05-30T04:08:57.918Z"
        },
        "price": 950000,
        "promotionalPrice": 150000,
        "createdAt": "2021-06-01T06:21:55.000Z",
        "updatedAt": "2021-06-01T06:21:55.000Z"
    }
  ]
  ```

#### Search By category name

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
  curl --location --request GET 'localhost:8080/api/search/byCategory?keyword=ios'
  ```
- Success Sample Response Sample
  ```json
  [
    {
        "courseLecturers": [
            "60b745c0925c8e4710e90c6a",
            "60b74681925c8e4710e90c6b"
        ],
        "briefDescription": "Learn Android App Development with Android 7 Nougat by building real apps including Uber, Whatsapp and Instagram!",
        "detailDescription": "detailDescription",
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
  ]
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

### Statistic API

#### Get Top 5 Are Same With Course

- Method: `GET /statistics/same-course/:courseId`
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
    "error-string": "error string"
  }
  ```

#### Get 10 newest courses

- Method: `GET /statistics/newestCourses`
- Status Code:
    - Success: `200`
    - Failure: `500`
- Sample:

  ```code
  http://localhost:8080/statistics/newestCourses
  ```

- Success response:

  ```json
  [
    {
      "courseLecturers": [
        {
          "_id": "60b74346a651451b6f25b376",
          "fullName": "Maximilian Schwarzmüller"
        }
      ],
      "ratedNumber": 0,
      "ratingPoint": 7.25,
      "_id": "60b748b2a651451b6f25b377",
      "courseName": "React - The Complete Guide (incl Hooks, React Router, Redux)",
      "courseImage": "url(string)",
      "category": {
        "_id": "60b73923a651451b6f25b374",
        "categoryName": "React"
      },
      "price": 100000,
      "promotionalPrice": 10
    }
  ]
  ```
- Failed response:
  ```json
  {
    "error_message": "Something broke"
  }
  ```

#### Get 10 most viewed courses

- Method: `GET /statistics/mostViewedCourses`
- Status Code:
    - Success: `200`
    - Failure: `500`
- Sample:

  ```code
  http://localhost:8080/statistics/mostViewedCourses
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
      "view": 11,
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
- Failed response:
  ```json
  {
    "error_message": "Something broke"
  }
  ```

#### Get 3 featured course of the week

- Method: `GET /statistics/featuredCourses`
- Status Code:
    - Success: `200`
    - Failure: `500`
- Sample:

  ```code
  http://localhost:8080/statistics/featuredCourses
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
- Failed response:
  ```json
  {
    "error_message": "Something broke"
  }
  ```

#### Get list of featured category of the week

- Method: `GET /statistics/featuredCategories`
- Status Code:
    - Success: `200`
    - Failure: `500`
- Sample:

  ```code
  http://localhost:8080/statistics/featuredCategories
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
- Failed response:
  ```json
  {
    "error_message": "Something broke"
  }
  ```

### Enrollment API

#### Create an enrollment

- Method: `POST /enrollments`
- Status Code:
    - Success: `200`
    - Failure: `400`
- Body:
    - userId
    - courseId
- Sample:
  ```code
  http://localhost:8080/enrollments
  ```
- Success response:
  ```json
  {
    "_id": "60bb3e47a5348542d309233c",
    "courseId": "60b75429a651451b6f25b381",
    "userId": "60b9d65d0ab2a19495ec1211",
    "__v": 0,
    "registeredTime": "2021-06-05T09:05:11.184Z"
  }
  ```
- Failed response:
  ```json
  {
    "error": "user or course not found"
  }
  ```
### Progress API
#### Create or update progress
- Method: `POST /progresses`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body: 
  - userId
  - courseId
  - lessonId
  - progress
- Sample:
  ```code
  http://localhost:8080/progresses
  ```
- Success response:
  ```json
  {
    "isFinish": true,
    "_id": "60bb3e9aa5348542d309233d",
    "lessonId": "60b75684a651451b6f25b386",
    "userId": "60b9d65d0ab2a19495ec1211",
    "__v": 0,
    "progress": 50
  }
  ```
- Failed response:
  ```json
  {
    "error": "invalid userId or courseId"
  }
  ```
  ```json
  {
    "error": "course does not include the lesson"
  }
  ```
  ```json
  {
    "error": "invalid progress"
  }
  ```
