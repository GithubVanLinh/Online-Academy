# Online Academy

This is a online academy, Back-end is Nodejs, Front-End is ReactJs

---

## Fearture Of This Project

- [Sign In](https://github.com/GithubVanLinh/Online-Academy#sign-in)

### Sign In

- Method: `POST /:user`
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
  ```
  localhost:8080/api/search/course/?keyword=react
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
  ```
  http://localhost:8080/api/search/byCategory?keyword=react
  ```

