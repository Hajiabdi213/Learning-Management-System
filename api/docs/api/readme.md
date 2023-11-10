# API DOCUMENTATION

### Base URL : ....

## OUTLINE

## USER MANAGEMENT

### 1. User Signup

#### Route: `POST /:role/signup`

- **Description:** Registers a new user.

- **Parameters:**

  - `role` (string): User role (only -> admin/instructor/student).

- **Request Body (JSON):**

  ```json
  {
    "firstName": "Abdillahi",
    "lastName": "Osman",
    "image": "https://example.com/profile.jpg",
    "email": "abdillahi@email.com",
    "password": "123",
    "phone": "0000000"
  }
  ```

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "User created successfully",
      "user": {
        // User details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 400 Bad Request
  - if the user types a wrong `role` which is not (admin, instructor, or student)
    ```json
    {
      "message": "Your Registration path is not right"
    }
    ```
  - Status Code: 400 Bad Request
  - if the user already exists
    ```json
    {
      "message": "user with the email {email} already exists"
    }
    ```

### 2. User Login

#### Route: `POST /login`

- **Description:** Authenticates a user.

- **Request Body (JSON):**

  ```json
  {
    "email": "abdillahi@email.com",
    "password": "123"
  }
  ```

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "User logged in successfully",
      "token": "{JWT token}"
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "User with the email {email} does not exist"
    }
    ```
  - Status Code: 401 Unauthorized
    ```json
    {
      "message": "Your account has been blocked"
    }
    ```
  - Status Code: 401 Unauthorized
    ```json
    {
      "message": "Invalid Credentials"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 3. Get All Users (Admin)

#### Route: `GET /`

- **Description:** Retrieves details of all users (Bearer token with admin privilege required ).
-

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "All Users Fetched",
      "users": [
        // List of users with details
      ]
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Users are not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 4. Get Users by Role (Admin)

#### Route: `GET /:role`

- **Description:** Retrieves details of users based on their role (Bearer token with admin privilege required ).

- **Parameters:**

  - `role` (string): User role (admin/instructor/student).

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": `All {role}s are fetched`,
      "users": [
        // List of users with details
      ]
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Users are not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 5. Update Logged-In User Profile

#### Route: `PUT /update`

- **Description:** Updates the profile of the logged-in user (Bearer token for the currently logged in user is required ).

- **Request Body (JSON):**

  ```json
  {
    "firstName": "Abdillahi",
    "lastName": "Haji",
    "password": "1233"
  }
  ```

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "user profile updated successfully",
      "user": {
        // Updated user details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "user was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 6. Update User by ID (Only Admin)

#### Route: `PUT /:id`

- **Description:** Updates the information of a specific user (Bearer token with admin privilege required ).

- **Parameters:**

  - `id` : User ID.

- **Request Body (JSON):**

  - Include the user fields you want to update.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "user updated successfully",
      "user": {
        // Updated user details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": `User with the id {id} was not found`
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 7. Block User (Only Admin)

#### Route: `PUT /:id/block`

- **Description:** Blocks a user (Bearer token with admin privilege required ).

- **Parameters:**

  - `id` : User ID.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": `User with the id {id} has been blocked successfully`,
      "user": {
        // Blocked user details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": `User with the id {id} was not found`
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 8. Unblock User (Admin)

#### Route: `PUT /:id/un-block`

- **Description:** Unblocks a previously blocked user (Bearer token with admin privilege required ).

- **Parameters:**

  - `id` : User ID.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": `User with the id {id} has been unblocked successfully`,
      "user": {
        // Unblocked user details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": `User with the id {id} was not found`
    }
    ```
  -

Status Code: 500 Internal Server Error

````json
{
"message": "Internal server error"
}

### 9. Delete User (Admin)

#### Route: `DELETE /:id`

- **Description:** Deletes a user (Bearer token with admin privilege  required ).

- **Parameters:**

  - `id` (string): User ID.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": `user with the id {id} deleted successfully`
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": `User with the ID {id} was not found`
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

---
````
