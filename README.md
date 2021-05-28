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
    "full_name":"string",
    "email": "string",
    "phone_number": "string",
    "date_of_birth":"Date string",
  }
  ```

- Success Response Body Example

  ```json
  {
    "username": "string",
    "full_name":"string",
    "email": "string",
    "phone_number": "string",
    "date_of_birth":"Date string",
  }
  ```

- Failure Response Body Example

  ```json
  {
    "error": "error string",
  }
  ```
