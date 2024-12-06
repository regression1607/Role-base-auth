# Assignment API Documentation

# Assignment API Documentation

## User Routes

### Register User
- **URL:** `/api/users/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "username": "exampleUser",
    "email": "user@example.com",
    "password": "Password123!"
  }


Description: Registers a new user.
Login User
URL: /api/users/login
Method: POST
Body {
  "email": "user@example.com",
  "password": "Password123!"
}

Logout User
URL: /api/users/logout
Method: POST
Headers:
Authorization: Bearer <token>
Description: Logs out a user by invalidating the token.
Get User Profile
URL: /api/users/profile
Method: GET
Headers:
Authorization: Bearer <token>
Description: Retrieves the profile of the logged-in user.
Admin Endpoint
Admin Endpoint
URL: /api/users/admin
Method: GET
Headers: <vscode_annotation details='%5B%7B%22title%22%3A%22hardcoded-credentials%22%2C%22description%22%3A%22Embedding%20credentials%20in%20source%20code%20risks%20unauthorized%20access%22%7D%5D'> -</vscode_annotation> Authorization: Bearer <token>
Description: Access restricted to admin users.
Task Routes

Create Task
URL: /api/tasks
Method: POST
Headers:
Authorization: Bearer <token>
Body:
{
  "title": "New Task",
  "description": "Task description",
  "dueDate": "2023-12-31",
  "priority": "high",
  "status": "pending"
}

Get Tasks
URL: /api/tasks
Method: GET
Headers:
Authorization: Bearer <token>
Description: Retrieves all tasks for the logged-in user.
Update Task
URL: /api/tasks/:id
Method: PUT
Headers:
Authorization: Bearer <token>
Body:

{
  "title": "Updated Task",
  "description": "Updated description",
  "dueDate": "2023-12-31",
  "priority": "medium",
  "status": "in-progress"
}

Delete Task
URL: /api/tasks/:id
Method: DELETE
Headers:
Authorization: Bearer <token>
Description: Deletes a task by ID.
Assign Task
URL: /api/tasks/assign
Method: POST
Headers:
Authorization: Bearer <token>
Body:
{
  "taskId": "task_id_here",
  "userId": "user_id_here"
}
Get Assigned Tasks
URL: /api/tasks/assigned
Method: GET
Headers:
Authorization: Bearer <token>
Description: Retrieves tasks assigned to the logged-in user.

This documentation provides detailed information on how to test each API endpoint using Postman.