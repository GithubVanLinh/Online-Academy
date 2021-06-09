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
  - [Change user avatar](https://github.com/GithubVanLinh/Online-Academy#change-user-avatar)
  
- [Lecturer API](https://github.com/GithubVanLinh/Online-Academy#lecturer-api)

  - [Lecturer Log In](https://github.com/GithubVanLinh/Online-Academy#lecturer-log-in)
  - [Lecturer request new accessToken](https://github.com/GithubVanLinh/Online-Academy#lecturer-request-new-accesstoken)
  - [Lecturer change avatar](https://github.com/GithubVanLinh/Online-Academy#lecturer-change-avatar)

- [Course API](https://github.com/GithubVanLinh/Online-Academy#course-api)
  - [Get Courses](https://github.com/GithubVanLinh/Online-Academy#get-courses)
  - [Get Courses By CategoryId](https://github.com/GithubVanLinh/Online-Academy#get-courses-by-categoryid)
  - [Get Course Infomation](https://github.com/GithubVanLinh/Online-Academy#get-course-information)
  - [Get List Lecturer Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-lecturer-of-course)
  - [Get List Feedback Of Course](https://github.com/GithubVanLinh/Online-Academy#get-list-feedback-of-course)
  - [Send feedback](https://github.com/GithubVanLinh/Online-Academy#send-feedback)
  - [Set complete status](https://github.com/GithubVanLinh/Online-Academy#set-complete-status)
  - [Update course descriptions](https://github.com/GithubVanLinh/Online-Academy#update-course-description)
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
- [Administrator API](https://github.com/GithubVanLinh/Online-Academy#administator-api)
  - [Course Management](https://github.com/GithubVanLinh/Online-Academy#manage-course)
    - [Remove Course](https://github.com/GithubVanLinh/Online-Academy#remove-course)
  - [Category Management](https://github.com/GithubVanLinh/Online-Academy#manage-category)
    - [Get All Category](https://github.com/GithubVanLinh/Online-Academy#get-all-category)
    - [Get Category Detail](https://github.com/GithubVanLinh/Online-Academy#get-category-detail)
    - [Add Category](https://github.com/GithubVanLinh/Online-Academy#add-category)
    - [Delete Category](https://github.com/GithubVanLinh/Online-Academy#delete-category)
    - [Update Category](https://github.com/GithubVanLinh/Online-Academy#update-category)
  - [Student Management](https://github.com/GithubVanLinh/Online-Academy#student-management)
    - [Get All Student](https://github.com/GithubVanLinh/Online-Academy#get-all-student)
    - [Get Student Detail](https://github.com/GithubVanLinh/Online-Academy#get-student-detail)
    - [Delete Student](https://github.com/GithubVanLinh/Online-Academy#delete-student)
  - [Lecturer Management](https://github.com/GithubVanLinh/Online-Academy#lecturer-management)
    - [Get All Lecturer](https://github.com/GithubVanLinh/Online-Academy#get-all-lecturer)
    - [Get Lecturer Detail](https://github.com/GithubVanLinh/Online-Academy#get-lecturer-detail)
    - [Add Lecturer](https://github.com/GithubVanLinh/Online-Academy#add-lecturer)
    - [Delete Lecturer](https://github.com/GithubVanLinh/Online-Academy#delete-lecturer)

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
- Body ( at least one of following ):
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
#### Change user avatar
- Method: `POST /users/:userId/avatar`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Params:
  - userId
- Form-date:
  - avaImage
- Sample:
  ```code
  curl --location --request POST 'localhost:8080/users/60b8d2958e620084208eb793/avatar' \
  --form 'avaImage=@"/home/kptankhoa/Pictures/uv6sesg2qj071.jpg"'
  ```
- Success Response:
  ```json
  {
    "avatar": "https://i.imgur.com/W6aSjhy.jpeg",
    "_id": "60b8d2958e620084208eb793"
  }
  ```

### Lecturer API

#### Lecturer Log In

- Method: `POST /auth/login/lecturer`
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

- Method: `POST /auth/refresh/lecturer`
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

#### Lecturer change avatar
- Method: `POST /lecturers/:lecturerId/avatar`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Params:
  - lecturerId
- Form-date:
  - avaImage
- Sample:
  ```code
  curl --location --request POST  'localhost:8080/lecturers/60b745c0925c8e4710e90c6a/avatar' \
  --form 'avaImage=@"/home/kptankhoa/Pictures/uv6sesg2qj071.jpg"'
  ```
- Success Response:
  ```json
  {
    "avatar": "https://i.imgur.com/WiO6sGN.jpeg",
    "_id": "60b745c0925c8e4710e90c6a"
  }
  ```


#### Update lecturer information

- Method: `PATCH /lecturers/:lecturerId`
- Params:
  - lecturerId: a string contains 24 charaters
- Body ( at least one of following ):
  - fullName
  - phone
  - address
  - description
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/lecturers/60bf19957952b970b11b9f58
  ```
- Success response:
  ```json
  {
    "_id": "60bf19957952b970b11b9f58",
    "fullName": "Gia Kiet",
    "address": "tp hcm",
    "phone": "0338339593",
    "description": "this is description"
  }
  ```
- Failed response:
  ```json
  {
    "error": "lecturer not found"
  }
  ```

#### Send change lecturer email request

- Method: `POST /lecturers/:lecturerId/email`
- Params:
  - lecturerId: a string contains 24 charaters
- Body:
  - email
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/lecturers/60bf19957952b970b11b9f58/email
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
    "error": "lecturer not found"
  }
  ```

#### Verify email to change lecturer email

- Method: `POST /lecturers/:lecturerId/verify`
- Params:
  - lecturerId: a string contains 24 charaters
- Body:
  - email
  - key
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/lecturers/60bf19957952b970b11b9f58/verify
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
    "error": "lecturer not found"
  }
  ```

#### Change lecturer password

- Method: `PATCH /lecturers/:lecturerId/password`
- Params:
  - lecturerId: a string contains 24 charaters
- Body:
  - currentPassword
  - newPassword
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/lecturers/60bf19957952b970b11b9f58/password
  ```
- Success response:
  ```json
  {
    "_id": "60bf19957952b970b11b9f58",
    "username": "giakiet99",
    "password": "$2a$10$UUrEV.6t7Z5PA3ICLnxb1.7AMzg03MH58b8GJxdjce0trJqRc54oi",
    "updatedAt": "2021-06-08T08:23:47.458Z"
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
    "error": "lecturer not found"
  }
  ```

#### Upload new course

- Method: `POST /lecturers/:lecturerId/courses`
- Params:
  - lecturerId: a string contains 24 charaters
- Body:
  - courseName
  - courseImage
  - category
  - price
  - promotionalPrice
  - briefDescription
  - detailDescription
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/lecturers/60bf19957952b970b11b9f58/courses
  ```
- Success response:
  ```json
  {
    "courseLecturers": [
        "60bf19957952b970b11b9f58"
    ],
    "briefDescription": "short desc",
    "detailDescription": "long desc",
    "soldNumber": 0,
    "ratedNumber": 0,
    "lessionNumber": 0,
    "totalHours": 0,
    "ratingPoint": 0,
    "status": "INCOMPLETE",
    "view": 0,
    "_id": "60bf43c55d61c8652a551042",
    "courseName": "Test create new course",
    "courseImage": "This is course image url",
    "category": "60b73923a651451b6f25b374",
    "price": 145000,
    "promotionalPrice": 45000,
    "createdAt": "2021-06-08T10:17:41.704Z",
    "updatedAt": "2021-06-08T10:17:41.704Z",
    "feedbacks": [],
    "__v": 0
  }
  ```
- Failed response:
  ```json
  {
    "error": "course is already exists"
  }
  ```
  ```json
  {
    "error": "lecturer not found"
  }
  ```
  ```json
  {
    "error": "invalid course info"
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

#### Get lesson info of the course

- Method: `GET /courses/:courseId/lessons/:lessonId`
- Headers:
  - x-access-token
- Params:
  - courseId
  - lessonId
- Status Code:
  - Success: `200`
  - Failure: `400`
- Sample:
  ```code
  http://localhost:8080/courses/60b748b2a651451b6f25b377/lessons/60b75041a651451b6f25b37b
  ```
- Success Response:
  ```json
  {
    "title": "Welcome To The Course!",
    "totalLength": 61,
    "videoUrl": "https://vimeo.com/559574353/16f3f822b5",
    "progress": 28,
    "isFinish": true
  }
  ```
- Failed Response:
  ```json
  {
    "error": "user haven't registered the course yet"
  }
  ```
  ```json
  {
    "error": "incorrect lessonId"
  }
  ```
### Set complete status
- Method: `POST /courses/:courseId/completion`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Params:
  - courseId
- Sample:
  ```code
  curl --location --request POST 'localhost:8080/courses/60bf43c55d61c8652a551042/completion'
  ```
- Success Response:
  ```json
  {
    "status": "COMPLETE",
    "_id": "60bf43c55d61c8652a551042"
  }
  ```
### Update course descriptions
- Method: `POST /courses/:courseId/description`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Params:
  - courseId
- Body(at least 1 of):
  - briefDescription
  - detailDescription
- Sample:
  ```code
  curl --location --request POST  localhost:8080/courses/60bf43c55d61c8652a551042/description' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "detailDescription":"longer",
  "briefDescription":"short"
  }'
  ```
- Success Response:
  ```json
  {
    "briefDescription": "short",
    "detailDescription": "longer",
    "_id": "60bf43c55d61c8652a551042"
  }
  ```

### Search API

#### Search By course name

- Method: `GET /api/search/course`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Query:
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
      "courseLecturers": ["60b755c0925c8e4710e90c70"],
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
- Query:
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

### Administator API

- Response when don't have permission

  ```json
  {
    "error_message": "permission denied"
  }
  ```

#### Course Management

##### Remove Course

- Method: `DELETE /courses/:courseId`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Param:
  - `courseId`: string Id of the course
- Success response:

  ```json
  {
    "message": "{courseId} delete success"
  }
  ```

- Failed response:

  - If course is invalid

  ```json
  {
    "error_message": "Invalid CourseId"
  }
  ```

#### Category Management

##### Get All Category

- Method: `GET /categories`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success response:

  ```json
  {
    "web": [
      {
        "categoryName": "string",
        "level": "WEB",
        "isDeleted": "bool",
        "createdAt": "date-string",
        "updatedAt": "date-string"
      }
    ],
    "mobile": [
      {
        "categoryName": "string",
        "level": "mobile",
        "isDeleted": "bool",
        "createdAt": "date-string",
        "updatedAt": "date-string"
      }
    ]
  }
  ```

##### Get Category Detail

- Method: `GET /categories/:categoryId`
- Params:
  - `category`: string id
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success response:

  ```json
  {
    "categoryName": "string",
    "level": "WEB",
    "isDeleted": "bool",
    "createdAt": "date-string",
    "updatedAt": "date-string"
  }
  ```

- Error response:

  ```json
  {
    "error_message": "invalid categoryId"
  }
  ```

##### Add Category

`categoryName` and `level` is unique

- Method: `POST /categories`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:

  ```json
  {
    "categoryName": "string",
    "level": "WEB"
  }
  ```

- Success response:

  ```json
  {
    "categoryName": "string",
    "level": "WEB",
    "isDeleted": "bool",
    "createdAt": "date-string",
    "updatedAt": "date-string"
  }
  ```

- Error response:

  - when add failed:

  ```json
  {
    "error_message": "string"
  }
  ```

##### Delete Category

- Method: `DELETE /categories/:categoryId`
- Params:
  - `category`: string id
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success response:

  ```json
  {
    "message": "category has removed"
  }
  ```

##### Update Category

`categoryName` and `level` is unique

- Method: `PATCH /categories/:categoryId`
- Params:
  - `categoryId`: string id
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:

  ```json
  {
    "categoryName": "string",
    "level": "WEB"
  }
  ```

- Success response:

  ```json
  {
    "categoryName": "string",
    "level": "WEB",
    "isDeleted": "bool",
    "createdAt": "date-string",
    "updatedAt": "date-string"
  }
  ```

#### Student Management

##### Get All Student

- Method: `GET /users`
- Status Code:

  - Success: `200`
  - Failure: `400`

- Success response:

  ```json
  [
    {
      "username": "string",
      "email": "email",
      "avatar": "link image",
      "phone": "string",
      "status": "PENDING|ACTIVE|DELETED",
      "createdAt": "string-date",
      "updatedAt": "string-date",
      "address": "string",
      "fullName": "string",
      "wishList": ["courseId"]
    }
  ]
  ```

##### Get Student Detail

- Method: `GET /users/:userId`
- Status Code:

  - Success: `200`
  - Failure: `400`

- Success response:

  ```json
  {
    "username": "string",
    "email": "email",
    "avatar": "link image",
    "phone": "string",
    "status": "PENDING|ACTIVE|DELETED",
    "createdAt": "string-date",
    "updatedAt": "string-date",
    "address": "string",
    "fullName": "string",
    "wishList": ["course"]
  }
  ```

- Error response:

  ```json
  {
    "error_message": "invalid userId"
  }
  ```

##### Delete Student

- Method: `DELETE /users/:userId`
- Status Code:

  - Success: `200`
  - Failure: `400`

- Success response:

  ```json
  {
    "message": "user has removed"
  }
  ```

- Error response:

  ```json
  {
    "error_message": "invalid userId"
  }
  ```

#### Lecturer Management

##### Get All Lecturer

- Method: `GET /lecturers`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success response:

  ```json
  [
    {
      "username": "string",
      "fullName": "string",
      "email": "email",
      "avatar": "link image",
      "address": "string",
      "createdAt": "date-string",
      "updatedAt": "date-string",
      "status": "ACTIVE|DELETED",
      "phone": "phone-number-string",
      "description": "string",
      "teachingCourses": ["course"]
    }
  ]
  ```

##### Get Lecturer Detail

- Method: `GET /lecturers/lecturerId`
- Params:
  - `lecturerId`: string id
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success response:

  ```json
  {
    "username": "string",
    "fullName": "string",
    "email": "email",
    "avatar": "link image",
    "address": "string",
    "createdAt": "date-string",
    "updatedAt": "date-string",
    "status": "ACTIVE|DELETED",
    "phone": "phone-number-string",
    "description": "string",
    "teachingCourses": ["course"]
  }
  ```

- Error response:

```json
{
  "error_message": "invalid lecturerId"
}
```

##### Add Lecturer

- Method: `POST /lecturers`
- Status Code:
  - Success: `200`
  - Failure: `400`
- Body:

  ```json
  {
    "username": "string",
    "password": "string",
    "fullName": "string",
    "email": "email",
    "avatar": "link image",
    "address": "string",
    "phone": "phone-number-string",
    "description": "string"
  }
  ```

- Success response:

  ```json
  {
    "username": "string",
    "fullName": "string",
    "email": "email",
    "avatar": "link image",
    "address": "string",
    "createdAt": "date-string",
    "updatedAt": "date-string",
    "status": "ACTIVE|DELETED",
    "phone": "phone-number-string",
    "description": "string",
    "teachingCourses": []
  }
  ```

##### Delete Lecturer

- Method: `DELETE /lecturers/:lecturerId`
- Params:
  - `lecturerId`: string id
- Status Code:
  - Success: `200`
  - Failure: `400`
- Success response:

```json
{
  "message": "lecturer has removed"
}
```
