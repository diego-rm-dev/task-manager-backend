# Task Manager API Endpoints

## Base Information
- Base URL: `http://localhost:3000/api`
- Authentication: JWT required for all endpoints except login/register
- Response Format: JSON
- Error Format: `{ status: "error", message: "description", code: "ERROR_CODE" }`

## User Endpoints

### Authentication
- `POST /users/login`
  - Request Body: `{ email: string, password: string }`
  - Response: `{ token: string, user: IUserResponse }`

### User Management
- `POST /users`
  - Request Body: `{ name: string, username: string, email: string, password: string, role: "user" | "admin" }`
  - Response: `{ user: IUserResponse }`

- `GET /users/:id`
  - Response: `{ user: IUserResponse }`

- `PUT /users/:id`
  - Request Body: `{ name: string, email: string, role: "user" | "admin" }`
  - Response: `{ user: IUserResponse }`

## Board Endpoints

### Board Management
- `POST /boards`
  - Request Body: `{ name: string, owner: ObjectId, description?: string, visibility: "private" | "public" | "team" }`
  - Response: `{ board: IBoardResponse }`

- `GET /boards`
  - Response: `{ boards: IBoardResponse[] }`

- `GET /boards/:id`
  - Response: `{ board: IBoardResponse }`

- `PUT /boards/:id`
  - Request Body: `{ name: string, description?: string, visibility: "private" | "public" | "team" }`
  - Response: `{ board: IBoardResponse }`

- `DELETE /boards/:id`
  - Response: `{ status: "success", message: "Board deleted successfully" }`

## Task Endpoints

### Task Management
- `POST /tasks`
  - Request Body: `{ name: string, description: string, owner: ObjectId, board: ObjectId, status: string, start_date: Date, due_date: Date, priority: string, label: ObjectId }`
  - Response: `{ task: ITaskResponse }`

- `GET /tasks`
  - Response: `{ tasks: ITaskResponse[] }`

- `GET /tasks/:id`
  - Response: `{ task: ITaskResponse }`

- `PUT /tasks/:id`
  - Request Body: `{ name: string, description: string, status: string, start_date: Date, due_date: Date, priority: string, label: ObjectId }`
  - Response: `{ task: ITaskResponse }`

- `DELETE /tasks/:id`
  - Response: `{ status: "success", message: "Task deleted successfully" }`

## Collaborator Endpoints

### Collaboration Management
- `POST /collaborators`
  - Request Body: `{ user: ObjectId, board: ObjectId, role: "owner" | "editor" | "viewer" }`
  - Response: `{ collaborator: ICollaboratorResponse }`

- `GET /collaborators`
  - Response: `{ collaborators: ICollaboratorResponse[] }`

- `GET /collaborators/:id`
  - Response: `{ collaborator: ICollaboratorResponse }`

- `PUT /collaborators/:id`
  - Request Body: `{ role: "owner" | "editor" | "viewer" }`
  - Response: `{ collaborator: ICollaboratorResponse }`

- `DELETE /collaborators/:id`
  - Response: `{ status: "success", message: "Collaborator removed successfully" }`

## Comment Endpoints

### Comment Management
- `POST /comments`
  - Request Body: `{ content: string, task: ObjectId, author: ObjectId }`
  - Response: `{ comment: ICommentResponse }`

- `GET /comments`
  - Response: `{ comments: ICommentResponse[] }`

- `GET /comments/:id`
  - Response: `{ comment: ICommentResponse }`

- `PUT /comments/:id`
  - Request Body: `{ content: string }`
  - Response: `{ comment: ICommentResponse }`

- `DELETE /comments/:id`
  - Response: `{ status: "success", message: "Comment deleted successfully" }`

## Label Endpoints

### Label Management
- `POST /labels`
  - Request Body: `{ name: string, color: string, board: ObjectId }`
  - Response: `{ label: ILabelResponse }`

- `GET /labels`
  - Response: `{ labels: ILabelResponse[] }`

- `GET /labels/:id`
  - Response: `{ label: ILabelResponse }`

- `PUT /labels/:id`
  - Request Body: `{ name: string, color: string }`
  - Response: `{ label: ILabelResponse }`

- `DELETE /labels/:id`
  - Response: `{ status: "success", message: "Label deleted successfully" }`

## Response Types

```typescript
// User Response
interface IUserResponse {
    id: any;
    name: string;
    email: string;
}

// Board Response
interface IBoardResponse {
    name: string;
    owner: ObjectId;
    description?: string;
    visibility: "private" | "public" | "team";
}

// Task Response
interface ITaskResponse {
    id: any;
    name: string;
    description: string;
    owner: ObjectId;
    board: ObjectId;
    status: string;
    start_date: Date;
    due_date: Date;
    priority: string;
    label: ObjectId;
}

// Collaborator Response
interface ICollaboratorResponse {
    id: any;
    user: ObjectId;
    board: ObjectId;
    role: "owner" | "editor" | "viewer";
}

// Comment Response
interface ICommentResponse {
    id: any;
    content: string;
    task: ObjectId;
    author: ObjectId;
    created_at: Date;
}

// Label Response
interface ILabelResponse {
    id: any;
    name: string;
    color: string;
    board: ObjectId;
}
```
