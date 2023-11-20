# API DOCUMENTATION

---

Welcome to the comprehensive API documentation for our Learning Management System (LMS) API. This powerful API offers a range of endpoints dedicated to efficiently managing users (admins, instructors, and students), courses, lessons, and assessments within the educational ecosystem. To leverage this API, simply make requests to the following base URL: https://learning-management-system-o54h.onrender.com/api, appending the respective endpoints as detailed below. For instance, to interact with courses, access the endpoint: https://learning-management-system-o54h.onrender.com/api/courses. Explore the wealth of functionalities provided by each endpoint to seamlessly integrate and enhance your Learning Management System experience.

---

## TABLE OF CONTENTS

1. [User Management](#user-management)
   1.1 [User Signup](#1-user-signup)
   1.2 [User Login](#2-user-login)
   1.3 [Get All Users (Admin)](#3-get-all-users-admin)
   1.4 [Get Users by Role (Admin)](#4-get-users-by-role-admin)
   1.5 [GET Profile of Logged-in User](#5-get-profile-of-logged-in-user)
   1.6 [GET Profile of Specific User (admin))](#6-get-profile-of-specific-user-admin)
   1.7 [Update Logged-In User Profile](#7-update-logged-in-user-profile)
   1.8 [Update User by ID (Only Admin)](#8-update-user-by-id-only-admin)
   1.9 [Block User (Only Admin)](#9-block-user-only-admin)
   1.10 [Unblock User (Admin)](#10-unblock-user-admin)
   1.11 [Delete User (Admin)](#11-delete-user-admin)

2. [Course Management](#course-management)
   2.1 [Create Course](#1-create-course)
   2.2 [Get All Courses](#2-get-all-courses)
   2.3 [Get Specific Course](#3-get-specific-course)
   2.4 [Get All My Courses](#4-get-all-my-courses)
   2.5 [Get My Specific Course](#5-get-my-specific-course)
   2.6 [Get All My Enrolled Courses](#6-get-all-my-enrolled-courses)
   2.7 [Get Specific Course Enrolled by Logged-In User](#7-get-specific-course-enrolled-by-logged-in-user)
   2.8 [Enroll in a Course](#8-enroll-in-a-course)
   2.9 [Update a Course](#9-update-a-course)
   2.10 [Delete a Course](#10-delete-a-course)
   2.11 [Delete My Course](#11-delete-my-course)

3. [Course-Section Management](#course-section-management)
   3.1 [Get All Course Sections](#1-get-all-course-sections)
   3.2 [Get Specific Course Section](#2-get-specific-course-section)
   3.3 [Create a Section](#3-create-a-section)
   3.4 [Update a Section](#4-update-a-section)
   3.5 [Delete a Section](#5-delete-a-section)

4. [Lessons Management](#lessons-management)
   4.1 [Get All Lessons of a Section](#1-get-all-lessons-of-a-section)
   4.2 [Get Specific Lesson](#2-get-specific-lesson)
   4.3 [Create a Lesson](#3-create-a-lesson)
   4.4 [Update a Lesson](#4-update-a-lesson)
   4.5 [Delete a Lesson](#5-delete-a-lesson)

5. [Assessment Management](#assessment-management)
   5.1 [Get All Assessments of a Section](#1-get-all-assessments-of-a-section)
   5.2 [Get Specific Assessment](#2-get-specific-assessment)
   5.3 [Create an Assessment](#3-create-an-assessment)
   5.4 [Update an Assessment](#4-update-an-assessment)
   5.5 [Delete an Assessment](#5-delete-an-assessment)
   5.6 [Submit an Assessment](#6-submit-an-assessment)
   5.7 [Get All Submissions of an Assessment](#7-get-all-submissions-of-an-assessment)
   5.8 [Grade a Submission](#8-grade-a-submission)
   5.9 [Get All Graded Submissions of an Assessment](#9-get-all-graded-submissions-of-an-assessment)
   5.10 [Get Your Submissions of an Assessment](#10-get-your-submissions-of-an-assessment)

6. [Course Category Management](#6-course-category-management)
   6.1 [Create Course Category](#1-create-course-category)
   6.2 [Get All Course Categories](#2-get-all-course-categories)
   6.3 [Get Specific Course Category](#3-get-specific-course-category)
   6.4 [Update Category](#4-update-category)
   6.5 [Delete a Category](#5-delete-a-category)

---

## USER MANAGEMENT

### Users Base URL: `BaseURL/users/`

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
      "message": "All {role}s are fetched",
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

### 5. GET Profile of Logged-in User

#### ROUTE: `GET /profile`

- **Description:** Getting the profile of the logged-in user (Bearer token for the currently logged in user is required ).

- **Response:**

  - Status Code: 200 OK
  - Content:

    ```json
    {
      "message": "user found successfully ",
      "user": {
        // user profile details or information
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "User  not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 6. GET Profile of Specific User (admin)

#### ROUTE: `GET profile/:id`

- **Description:** Getting the profile of the specific user (Bearer token with admin privilege required ).

- **Parameters:**

  - `id` : User ID.

- **Response:**

  - Status Code: 200 OK
  - Content:

    ```json
    {
      "message": "user found successfully ",
      "user": {
        // user profile details or information
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "User  not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 7. Update Logged-In User Profile

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

### 8. Update User by ID (Only Admin)

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
      "message": "User with the id {id} was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 9. Block User (Only Admin)

#### Route: `PUT /:id/block`

- **Description:** Blocks a user (Bearer token with admin privilege required ).

- **Parameters:**

  - `id` : User ID.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "User with the id {id} has been blocked successfully",
      "user": {
        // Blocked user details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "User with the id {id} was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

### 10. Unblock User (Admin)

#### Route: `PUT /:id/un-block`

- **Description:** Unblocks a previously blocked user (Bearer token with admin privilege required ).

- **Parameters:**

  - `id` : User ID.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "User with the id {id} has been unblocked successfully",
      "user": {
        // Unblocked user details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "User with the id {id} was not found"
    }
    ```
  -

Status Code: 500 Internal Server Error

```json
{
  "message": "Internal server error"
}
```

### 11. Delete User (Admin)

#### Route: `DELETE /:id`

- **Description:** Deletes a user (Bearer token with admin privilege required ).

- **Parameters:**

  - `id` (string): User ID.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "user with the id {id} deleted successfull"
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "User with the ID {id} was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error"
    }
    ```

---

## COURSE MANAGEMENT

#### Courses URL = `/baseURL/courses/`

### 1. Create Course

#### Route: `POST /create`

- **Description:** Creates a new course.

- **Authorization:** Admin or Instructor

- **Request Body (JSON):**

  ```json
  {
    "title": "New Course",
    "description": "course description",
    "image": "course image",
    "price": 29,
    "totalHours": "4hr",
    "isFeatured": true,
    "categoryId": 1
  }
  ```

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "Course created successfully",
      "newCourse": {
        // Course details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "Internal server error",
      "error": "{error_message}"
    }
    ```

### 2. Get All Courses

#### Route: `GET /`

- **Description:** Retrieves details of all courses.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "All courses Fetched",
      "courses": [
        // List of courses with details
      ]
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Courses are not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "error": "{error_message}"
    }
    ```

### 3. Get Specific Course

#### Route: `GET /:slug`

- **Description:** Retrieves details of a specific course.

- **Parameters:**

  - `slug` (string): Course slug.

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "Course {slug} was successfully found",
      "course": {
        // Course details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Course {slug} was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 4. Get All My Courses

#### Route: `GET /my-courses/all`

- **Description:** Retrieves details of all courses created by the logged-in user (admin/instructor).

- **Authorization:** Admin or Instructor

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "Your courses found successfully",
      "myCourses": [
        // List of courses with details
      ]
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "There's no course found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 5. Get My Specific Course

#### Route: `GET /my-courses/:slug`

- **Description:** Retrieves details of a specific course created by the logged-in user (admin/instructor).

- **Parameters:**

  - `slug` (string): Course slug.

- **Authorization:** Admin or Instructor

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "Your {slug} course  successfully",
      "myCourse": {
        // Course details
      }
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Course {slug} was not found or it is not a course you ow"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 6. Get All My Enrolled Courses

#### Route: `GET /enrolled-courses/all`

- **Description:** Retrieves details of all courses enrolled by the logged-in user (admin/instructor/student).

- **Authorization:** Admin, Instructor, or Student

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    [
      // List of enrolled courses with details
    ]
    ```

- **Error Responses:**
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 7. Get Specific Course Enrolled by Logged-In User

#### Route: `GET /enrolled-courses/:slug`

- **Description:** Retrieves details of a specific course enrolled by the logged-in user (admin/instructor/student).

- **Parameters:**

  - `slug` (string): Course slug.

- **Authorization:** Admin, Instructor, or Student

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      // Details of the enrolled course
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Course was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 8. Enroll in a Course

#### Route: `PUT /:slug/enroll`

- **Description:** Enrolls the logged-in user in a specific course.

- **Parameters:**

  - `slug` (string): Course slug.

- **Authorization:** Admin, Instructor, or Student

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "You enrolled {slug} course",
      "user": {
        // User details added with the the course in which the user enrolled
      }
    }
    ```

- **Error Responses:**
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 9. Update a Course

#### Route: `PUT /:slug`

- **Description:** Updates the details of a specific course.

- **Parameters:**

  - `slug` (string): Course slug.

- **Authorization:** Admin

- **Request Body (JSON):**

  - Include the fields you want to update.

- **Response:**

  - Status Code: 200 OK
  - Content:

```json
{
  "message": "Course {slug} has been updated successfully",
  "course": {
    // Updated course details
  }
}
```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Course {slug} was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 10. Delete a Course

#### Route: `DELETE /:slug`

- **Description:** Deletes a specific course.

- **Parameters:**

  - `slug` (string): Course slug.

- **Authorization:** Admin

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "Course {slug} has been deleted successfull"
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Course was not found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

### 11. Delete My Course

#### Route: `DELETE /my-courses/:slug`

- **Description:** Deletes a course created by the logged-in user (admin or instructor).

- **Parameters:**

  - `slug` (string): Course slug.

- **Authorization:** Admin or Instructor

- **Response:**

  - Status Code: 200 OK
  - Content:
    ```json
    {
      "message": "You Deleted The Course Successfully"
    }
    ```

- **Error Responses:**
  - Status Code: 404 Not Found
    ```json
    {
      "message": "Course Not Found"
    }
    ```
  - Status Code: 500 Internal Server Error
    ```json
    {
      "message": "{error_message}"
    }
    ```

---

## COURSE-SECTION MANAGEMENT

### 1. Get All Course Sections

**Route:**
`GET /:course_slug/sections`

**Authorization:** Admin, Instructor, or Enrolled Student

**Description:**
Retrieves details of all sections for a specific course.

**Response:**

- Status Code: 200 OK

```json
[
  // List of sections with details
]
```

**Error Responses:**

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 2. Get Specific Course Section

**Route:**
`GET /:course_slug/sections/:id`

**Authorization:** Admin, Instructor, or Enrolled Student

**Description:**
Retrieves details of a specific section for a course.

**Parameters:**

- `id` (string): Section ID.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Section Found successfully",
  "section": {
    // Section details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Section with the id {id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 3. Create a Section

**Route:**
`POST /:course_slug/sections`

**Authorization:**

- Admin or Instructor (Course Creator)

**Request Body (JSON):**

```json
{
  "title": "New Section"
}
```

**Response:**

- Status Code: 201 Created

```json
{
  "message": "Section created successfully",
  "section": {
    // Section details
  }
}
```

**Error Responses:**

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 4. Update a Section

**Route:**
`PUT /:course_slug/sections/:id`

**Authorization:**

- Admin or Instructor (Course Creator)

**Parameters:**

- `id` (string): Section ID.

**Request Body (JSON):**

```json
{
  "title": "Updated Section"
}
```

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Section was updated successfully",
  "updatedSection": {
    // Updated section details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Section with the id {id} was not found or it is not in this course"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 5. Delete a Section

**Route:**
`DELETE /:course_slug/sections/:id`

**Authorization:**

- Admin or Instructor (Course Creator)

**Parameters:**

- `id` (string): Section ID.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Section with the id {id} was deleted successfully",
  "targetSection": {
    // Deleted section details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Section with the id {id} was not found or it is not in this course"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

---

## LESSONS MANAGEMENT

### 1. Get All Lessons of a Section

**Route:**
`GET /:course_slug/:section_id/lessons`

**Authorization:**

- Admin, Instructor, or Enrolled Student

**Description:**
Retrieves details of all lessons for a specific section.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Lessons of the {section_title} section",
  "lessons": [
    // List of lessons with details
  ]
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Section with the id {section_id} does not exist in {course_slug}"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 2. Get Specific Lesson

**Route:**
`GET /:course_slug/:section_id/lesson/:lesson_id`

**Authorization:**

- Admin, Instructor, or Enrolled Student

**Description:**
Retrieves details of a specific lesson in a section.

**Parameters:**

- `lesson_id` (string): Lesson ID.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Lesson with the id {lesson_id} was found successfully",
  "lesson": {
    // Lesson details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Lesson with the id {lesson_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 3. Create a Lesson

**Route:**
`POST /:course_slug/:section_id`

**Authorization:**

- Admin or Instructor (Course Creator)

**Request Body (JSON):**

```json
{
  "source": "vimeo",
  "title": "Lesson 1: Introduction",
  "type": "video",
  "free_preview": false,
  "duration": "10min",
  "video_link": "https:....."
}
```

**Response:**

- Status Code: 201 Created

```json
{
  "message": "Lesson created successfully",
  "lesson": {
    // Lesson details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Section with the id {section_id} does not exist in {course_slug}"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 4. Update a Lesson

**Route:**
`PUT /:course_slug/:section_id/lesson/:lesson_id`

**Authorization:**

- Admin or Instructor (Course Creator)

**Parameters:**

- `lesson_id` (string): Lesson ID.

**Request Body (JSON):**

```json
{
  // Updated lesson details
}
```

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Lesson with the id {lesson_id} was updated successfully",
  "updatedLesson": {
    // Updated lesson details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Lesson with the id {lesson_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 5. Delete a Lesson

**Route:**
`DELETE /:course_slug/:section_id/lesson/:lesson_id`

**Authorization:**

- Admin or Instructor (Course Creator)

**Parameters:**

- `lesson_id` (string): Lesson ID.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Lesson with the id {lesson_id} was deleted successfully",
  "targetLesson": {
    // Deleted lesson details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Lesson with the id {lesson_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

---

## ASSESSMENT MANAGEMENT

### 1. Get All Assessments of a Section

**Route:**
`GET /:course_slug/:section_id/assessments`

**Authorization:**

- Admin, Instructor, or Enrolled Student

**Description:**
Retrieves details of all assessments for a specific section.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Assessments of the {section_title} section",
  "assessments": [
    // List of assessments with details
  ]
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Section with the id {section_id} does not exist in {course_slug}"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 2. Get Specific Assessment

**Route:**
`GET /:course_slug/:section_id/assessments/:assessment_id`

**Authorization:**

- Admin, Instructor, or Enrolled Student

**Description:**
Retrieves details of a specific assessment in a section.

**Parameters:**

- `assessment_id` (string): Assessment ID.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Assessment with the id {assessment_id} was found successfully",
  "assessment": {
    // Assessment details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Assessment with the id {assessment_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 3. Create an Assessment

**Route:**
`POST /:course_slug/:section_id/assessments`

**Authorization:**

- Admin or Instructor (Course Creator)

**Request Body (JSON):**

```json
{
  "title": "Assessment 01",
  "content": "...."
}
```

**Response:**

- Status Code: 201 Created

```json
{
  "message": "Assessment created successfully",
  "assessment": {
    // Assessment details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Section with the id {section_id} does not exist in {course_slug}"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 4. Update an Assessment

**Route:**
`PUT /:course_slug/:section_id/assessments/:assessment_id`

**Authorization:**

- Admin or Instructor (Course Creator)

**Parameters:**

- `assessment_id` (string): Assessment ID.

**Request Body (JSON):**

```json
{
  // Updated assessment details
}
```

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Assessment with the id {assessment_id} was updated successfully",
  "updatedAssessment": {
    // Updated assessment details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Assessment with the id {assessment_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 5. Delete an Assessment

**Route:**
`DELETE /:course_slug/:section_id/assessments/:assessment_id`

**Authorization:**

- Admin or Instructor (Course Creator)

**Parameters:**

- `assessment_id` (string): Assessment ID.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Assessment with the id {assessment_id} was deleted successfully",
  "targetAssessment": {
    // Deleted assessment details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Assessment with the id {assessment_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 6. Submit an Assessment

**Route:**
`POST /:course_slug/:section_id/assessments/:assessment_id/submit`

**Authorization:**

- Enrolled Student

**Request Body (JSON):**

```json
{
  "content": "Your submission content"
}
```

**Response:**

- Status Code: 201 Created

```json
{
  "message": "You submitted the assessment successfully",
  "submission": {
    // Submission details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Assessment with the id {assessment_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 7. Get All Submissions of an Assessment

**Route:**
`GET /:course_slug/:section_id/assessments/:assessment_id/submissions`

**Authorization:**

- Admin or Instructor (Course Creator)

**Response:**

- Status Code: 200 OK

```json
{
  "message": "All submissions of {assessment_title} assessment found",
  "submissions": [
    // List of submissions with details
  ]
}
```

\*\*

Error Responses:\*\*

- Status Code: 404 Not Found

```json
{
  "message": "Assessment with the id {assessment_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 8. Grade a Submission

**Route:**
`PUT /:course_slug/:section_id/assessments/:assessment_id/submissions/:submission_id/grade`

**Authorization:**

- Admin or Instructor (Course Creator)

**Parameters:**

- `submission_id` (string): Submission ID.

**Request Body (JSON):**

```json
{
  "points": 90
}
```

**Response:**

- Status Code: 200 OK

```json
{
  "message": "You graded the assessment submission successfully",
  "gradedSubmission": {
    // Graded submission details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Submission with the id {submission_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 9. Get All Graded Submissions of an Assessment

**Route:**
`GET /:course_slug/:section_id/assessments/:assessment_id/submissions/graded`

**Authorization:**

- Admin or Instructor (Course Creator)

**Response:**

- Status Code: 200 OK

```json
{
  "message": "All graded submissions of {assessment_title} assessment found",
  "gradedSubmissions": [
    // List of graded submissions with details
  ]
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Assessment with the id {assessment_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

### 10. Get Your Submissions of an Assessment

**Route:**
`GET /:course_slug/:section_id/assessments/:assessment_id/my_submissions`

**Authorization:**

- Enrolled Student

**Response:**

- Status Code: 200 OK

```json
{
  "message": "All Your submissions of {assessment_title} assessment",
  "submissions": [
    // List of your submissions with details
  ]
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Assessment with the id {assessment_id} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "message": "{error_message}"
}
```

---

## COURSE CATEGORY MANAGEMENT

### 1. Create Course Category

**Route:**
`POST /`

**Authorization:**

- Admin or Instructor

**Request Body (JSON):**

```json
{
  "title": "Category Title"
}
```

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Course Category created successfully",
  "newCategory": {
    // New category details
  }
}
```

**Error Responses:**

- Status Code: 500 Internal Server Error

```json
{
  "message": "Internal server error",
  "error": "{error_message}"
}
```

### 2. Get All Course Categories

**Route:**
`GET /`

**Authorization:**

- Admin, Instructor, or Student

**Response:**

- Status Code: 200 OK

```json
{
  "message": "All categories fetched",
  "categories": [
    // List of categories with details
  ]
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Categories are not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "error": "{error_message}"
}
```

### 3. Get Specific Course Category

**Route:**
`GET /:slug`

**Authorization:**

- Admin, Instructor, or Student

**Parameters:**

- `slug` (string): Category Slug.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Course category {slug} was successfully found",
  "category": {
    // Category details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Course category {slug} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "error": "{error_message}"
}
```

### 4. Update Category

**Route:**
`PUT /:slug`

**Authorization:**

- Admin or Instructor

**Parameters:**

- `slug` (string): Category Slug.

**Request Body (JSON):**

```json
{
  "title": "Updated Category Title"
}
```

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Course category updated successfully",
  "updatedCategory": {
    // Updated category details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Course category {slug} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "error": "{error_message}"
}
```

### 5. Delete a Category

**Route:**
`DELETE /:slug`

**Authorization:**

- Admin or Instructor

**Parameters:**

- `slug` (string): Category Slug.

**Response:**

- Status Code: 200 OK

```json
{
  "message": "Course category deleted successfully",
  "targetCategory": {
    // Deleted category details
  }
}
```

**Error Responses:**

- Status Code: 404 Not Found

```json
{
  "message": "Course category {slug} was not found"
}
```

- Status Code: 500 Internal Server Error

```json
{
  "error": "{error_message}"
}
```

---
