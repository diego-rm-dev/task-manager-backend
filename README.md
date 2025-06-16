# 📚 Task Manager Backend

A robust task management system built with TypeScript, Express, and MongoDB. This backend provides RESTful APIs for managing tasks, boards, users, labels, and comments with collaborative features.

## 🚀 Features

- Task Management
- Board Organization
- User Authentication
- Collaborative Features
- Label System
- Comment System
- Real-time Updates

## 🛠️ Tech Stack

- **Backend Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **Development Tools:** Nodemon, TypeScript

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file with your configuration:
```
PORT=3000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

4. Build and run the application:
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

## 📖 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication
All endpoints require authentication except for the login/register endpoints.

### Available Endpoints

#### Users
- `POST /users` - Register a new user
- `POST /users/login` - Login user
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile

#### Boards
- `POST /boards` - Create a new board
- `GET /boards` - List all boards
- `GET /boards/:id` - Get board details
- `PUT /boards/:id` - Update board
- `DELETE /boards/:id` - Delete board

#### Tasks
- `POST /tasks` - Create a new task
- `GET /tasks` - List all tasks
- `GET /tasks/:id` - Get task details
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

#### Labels
- `POST /labels` - Create a new label
- `GET /labels` - List all labels
- `GET /labels/:id` - Get label details
- `PUT /labels/:id` - Update label
- `DELETE /labels/:id` - Delete label

#### Comments
- `POST /comments` - Create a new comment
- `GET /comments` - List comments
- `GET /comments/:id` - Get comment details
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

#### Collaborators
- `POST /collaborators` - Add collaborator to board
- `GET /collaborators` - List board collaborators
- `GET /collaborators/:id` - Get collaborator details
- `PUT /collaborators/:id` - Update collaborator role
- `DELETE /collaborators/:id` - Remove collaborator

### Response Format

### 🚫 Error Handling

This API follows a consistent error handling pattern across all endpoints. When an error occurs, the response will have the following structure:

```json
{
  "code": <HTTP Status Code>,
  "message": <Error Message>,
  "details": <Optional Error Details>,
  "timestamp": <ISO 8601 Timestamp>
}
```

#### Error Codes

The API uses standard HTTP status codes with semantic meaning:

- `400 (Bad Request)`: When the request is invalid or missing required fields
- `401 (Unauthorized)`: When authentication is required but not provided
- `403 (Forbidden)`: When the user doesn't have permission to perform the action
- `404 (Not Found)`: When the requested resource doesn't exist
- `409 (Conflict)`: When the operation conflicts with the current state
- `500 (Internal Server Error)`: When an unexpected error occurs on the server

#### Example Error Responses

1. **Missing Required Fields**
```json
{
  "code": 400,
  "message": "Missing required fields",
  "details": "Please provide title, description, status, and boardId",
  "timestamp": "2025-06-16T06:44:55.000Z"
}
```

2. **Resource Not Found**
```json
{
  "code": 404,
  "message": "Task not found",
  "timestamp": "2025-06-16T06:44:55.000Z"
}
```

3. **Internal Server Error**
```json
{
  "code": 500,
  "message": "Internal Server Error",
  "timestamp": "2025-06-16T06:44:55.000Z"
}
```

### Response Format
All API responses follow this format:
```json
{
    "status": "success/error",
    "message": "Description of the operation",
    "data": { /* response data */ }
}
```

## 📝 Error Handling

The API returns standardized error responses:
```json
{
    "status": "error",
    "message": "Error description",
    "code": "ERROR_CODE"
}
```

## 🛡️ Security

- All routes are protected with JWT authentication
- Passwords are hashed using bcrypt
- Input validation for all endpoints
- Rate limiting for public endpoints

## 📁 Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
├── interfaces/     # TypeScript interfaces
├── middlewares/    # Custom middleware
└── index.ts        # Application entry point
```

## 📋 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📜 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
**Format:** JSON
**Authentication:** JWT (for protected routes - not shown in this draft)

---

## 📂 Summary

TaskManager is a full-featured project and task management API designed to support collaborative workflows. It includes user management, boards, tasks, labels, comments, and collaborator roles.

---

## 📁 Endpoints by Module

---

## 👤 Users

### 🔹 POST `/users` — Register

**Description:** Create a new user account.
**Body:**

```json
{
  "name": "Diego",
  "lastname": "Mejías",
  "username": "diegodev",
  "email": "diego@example.com",
  "password": "hashed_password_1",
  "age": 19,
  "role": "user"
}
```

---

### 🔹 POST `/users/login` — Login

**Description:** Authenticate user and return a token.
**Body:**

```json
{
  "email": "diego@example.com",
  "password": "hashed_password_1"
}
```

---

### 🔹 GET `/users` — Find All Users

**Description:** Retrieve a list of all users.

---

### 🔹 GET `/users/:id` — Find User by ID

**Description:** Retrieve a user by ID.

---

### 🔹 PUT `/users/:id` — Update User

**Description:** Update user data by ID.
**Body:** Same structure as `POST /users`.

---

### 🔹 DELETE `/users/:id` — Delete User

**Description:** Delete a user by ID.

---

## 📋 Boards

### 🔹 POST `/boards` — Create Board

**Description:** Create a new project board.
**Body:**

```json
{
  "name": "Marketing Dashboard",
  "owner": "684f61b3bb2e730ad64c5fa8",
  "description": "Track marketing campaigns and strategies.",
  "visibility": "team"
}
```

---

### 🔹 GET `/boards` — Find All Boards

**Description:** Retrieve all boards.

---

### 🔹 GET `/boards/:id` — Find Board by ID

**Description:** Retrieve a board by ID.

---

### 🔹 PUT `/boards/:id` — Update Board

**Description:** Modify board properties.

---

### 🔹 DELETE `/boards/:id` — Delete Board

**Description:** Remove a board by ID.

---

## ✅ Tasks

### 🔹 POST `/tasks` — Create Task

**Description:** Create a task within a board.
**Body:**

```json
{
  "name": "Create landing page",
  "description": "Design and code marketing landing page.",
  "owner": "684f61b3bb2e730ad64c5fa8",
  "board": "684f674dea8405abc188bcbb",
  "status": "in_progress",
  "start_date": "2024-06-10T00:00:00.000Z",
  "due_date": "2024-06-15T00:00:00.000Z",
  "priority": "high",
  "label": "684f714606efb5822984e2b6"
}
```

---

### 🔹 GET `/tasks` — Find All Tasks

**Description:** Retrieve all tasks.

---

### 🔹 GET `/tasks/:id` — Find Task by ID

**Description:** Get a single task.

---

### 🔹 PUT `/tasks/:id` — Update Task

**Description:** Modify a task by ID.

---

### 🔹 DELETE `/tasks/:id` — Delete Task

**Description:** Remove a task.

---

## 🏷️ Labels

### 🔹 POST `/labels` — Create Label

**Description:** Create a label to organize tasks.
**Body:**

```json
{
  "name": "Frontend",
  "color": "#FF5733"
}
```

---

### 🔹 GET `/labels` — Find All Labels

**Description:** Retrieve all labels.

---

### 🔹 GET `/labels/:id` — Find Label by ID

**Description:** Get a specific label.

---

### 🔹 PUT `/labels/:id` — Update Label

**Description:** Modify label properties.

---

### 🔹 DELETE `/labels/:id` — Delete Label

**Description:** Remove a label.

---

## 💬 Comments

### 🔹 POST `/comments` — Create Comment

**Description:** Add a comment to a task.
**Body:**

```json
{
  "content": "I’ll take care of this today.",
  "user": "684f61b3bb2e730ad64c5fa8",
  "task": "684f715a06efb5822984e2b9"
}
```

---

### 🔹 GET `/comments` — Find All Comments

**Description:** Retrieve all comments.

---

### 🔹 GET `/comments/:id` — Find Comment by ID

**Description:** Retrieve a specific comment.

---

### 🔹 PUT `/comments/:id` — Update Comment

**Description:** Edit a comment.

---

### 🔹 DELETE `/comments/:id` — Delete Comment

**Description:** Remove a comment.

---

## 👥 Collaborators

### 🔹 POST `/collaborators` — Add Collaborator

**Description:** Add a user to a board with a specific role.
**Body:**

```json
{
  "user": "684f6367440d20927107c375",
  "board": "684f674dea8405abc188bcbb",
  "role": "owner"
}
```

---

### 🔹 GET `/collaborators` — Find All Collaborators

**Description:** List all collaborators.

---

### 🔹 GET `/collaborators/:id` — Find Collaborator by ID

**Description:** Retrieve a collaborator.

---

### 🔹 PUT `/collaborators/:id` — Update Collaborator

**Description:** Change role or user.

---

### 🔹 DELETE `/collaborators/:id` — Remove Collaborator

**Description:** Remove a user from a board.

---

## 📎 Final Notes

* All `:id` params refer to MongoDB `_id` values.
* All endpoints return JSON and proper HTTP status codes.
* Add authentication middleware as needed for protected routes.
