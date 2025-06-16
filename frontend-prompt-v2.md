# Task Management Frontend Design Specification for Lovable

## Project Overview

Create a modern task management application frontend that focuses on user experience and productivity. The application should be built using React and TypeScript, with a clean and intuitive interface that supports drag-and-drop interactions.

## Core Data Models

### User Model
```typescript
interface IUser {
    id: string;
    name: string;
    lastname?: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
}
```

### Board Model
```typescript
interface IBoard {
    id: string;
    name: string;
    owner: string;  // User ID
    description?: string;
    visibility: 'private' | 'public' | 'team';
    tasks: ITask[];
    collaborators: ICollaborator[];
    labels: ILabel[];
}
```

### Task Model
```typescript
interface ITask {
    id: string;
    name: string;
    description: string;
    owner: string;  // User ID
    board: string;  // Board ID
    status: string;
    start_date: Date;
    due_date: Date;
    priority: string;
    label: string;  // Label ID
    comments: IComment[];
}
```

### Label Model
```typescript
interface ILabel {
    id: string;
    name: string;
    color: string;
    board: string;  // Board ID
}
```

### Collaborator Model
```typescript
interface ICollaborator {
    id: string;
    user: string;  // User ID
    board: string;  // Board ID
    role: 'owner' | 'editor' | 'viewer';
}
```

### Comment Model
```typescript
interface IComment {
    id: string;
    content: string;
    task: string;  // Task ID
    author: string;  // User ID
    created_at: Date;
}
```

## Main Views

### 1. Dashboard View
- Overview statistics
- Quick task creation
- Recent activities
- Upcoming deadlines
- Quick access to boards

### 2. Board View
- Kanban board layout with drag-and-drop
- Status columns: To Do, In Progress, Review, Done
- Task cards with:
  - Title
  - Due date
  - Priority indicator
  - Assignee avatar
  - Labels
  - Progress indicator

### 3. Task Details View
- Full task information
- Description editor
- Comments section
- File attachments
- Subtasks
- Labels management
- Status updates
- Time tracking

### 4. Labels Management View
- Create and edit labels
- Color picker
- Label hierarchy
- Quick filtering
- Usage statistics

### 5. Team View
- Team member list
- User roles and permissions
- Activity feed
- Notifications
- Team statistics

### 6. Calendar View
- Monthly and daily views
- Task scheduling
- Drag-and-drop task placement
- Time blocks
- Recurring tasks

## Modals and Forms

### Task Creation Modal
- Title input
- Description editor
- Due date picker
- Priority selector
- Label selection
- Assignee picker
- Subtasks
- Attachments
- Time estimates

### Board Creation Modal
- Board name
- Description
- Visibility settings
- Initial labels
- Collaborators
- Default workflow

### Label Creation Modal
- Label name
- Color picker
- Description
- Board association
- Icon selection

### Comment Creation Modal
- Rich text editor
- Attachments
- Mentions
- Quick reply
- Edit history

## Drag-and-Drop Functionality

1. **Task Management**
   - Drag tasks between columns
   - Reorder tasks within columns
   - Drag to create subtasks
   - Drag to attach files
   - Drag to assign labels

2. **Board Management**
   - Reorder boards
   - Drag tasks between boards
   - Drag to create new columns
   - Drag to archive tasks

3. **Label Management**
   - Drag to reorder labels
   - Drag to create label groups
   - Drag to apply multiple labels

## Backend Integration Hooks

```typescript
// API Configuration
export const API_CONFIG = {
    baseUrl: 'http://localhost:3000/api',
    endpoints: {
        auth: {
            login: '/users/login',
            register: '/users',
        },
        boards: '/boards',
        tasks: '/tasks',
        labels: '/labels',
        collaborators: '/collaborators',
        comments: '/comments',
    },
};

// Authentication
export interface AuthConfig {
    token: string;
    refreshToken: string;
    user: IUser;
}

// Error Handling
export interface ApiError {
    status: string;
    message: string;
    code: string;
}

// API Service Interface
export interface IApiService {
    // Authentication
    login(email: string, password: string): Promise<AuthConfig>;
    register(user: IUser): Promise<AuthConfig>;
    
    // Boards
    createBoard(board: IBoard): Promise<IBoard>;
    getBoards(): Promise<IBoard[]>;
    getBoard(id: string): Promise<IBoard>;
    updateBoard(id: string, board: IBoard): Promise<IBoard>;
    deleteBoard(id: string): Promise<void>;
    
    // Tasks
    createTask(task: ITask): Promise<ITask>;
    getTasks(boardId: string): Promise<ITask[]>;
    getTask(id: string): Promise<ITask>;
    updateTask(id: string, task: ITask): Promise<ITask>;
    deleteTask(id: string): Promise<void>;
    
    // Labels
    createLabel(label: ILabel): Promise<ILabel>;
    getLabels(boardId: string): Promise<ILabel[]>;
    getLabel(id: string): Promise<ILabel>;
    updateLabel(id: string, label: ILabel): Promise<ILabel>;
    deleteLabel(id: string): Promise<void>;
    
    // Collaborators
    addCollaborator(collaborator: ICollaborator): Promise<ICollaborator>;
    getCollaborators(boardId: string): Promise<ICollaborator[]>;
    updateCollaboratorRole(id: string, role: string): Promise<ICollaborator>;
    removeCollaborator(id: string): Promise<void>;
    
    // Comments
    createComment(comment: IComment): Promise<IComment>;
    getComments(taskId: string): Promise<IComment[]>;
    updateComment(id: string, content: string): Promise<IComment>;
    deleteComment(id: string): Promise<void>;
}
```

## Mock Data Structure

```typescript
// Mock Users
const mockUsers: IUser[] = [
    {
        id: '1',
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        role: 'admin'
    },
    {
        id: '2',
        name: 'Jane Smith',
        username: 'janesmith',
        email: 'jane@example.com',
        role: 'user'
    }
];

// Mock Boards
const mockBoards: IBoard[] = [
    {
        id: '1',
        name: 'Project A',
        owner: '1',
        visibility: 'team',
        tasks: [],
        collaborators: [],
        labels: []
    },
    {
        id: '2',
        name: 'Personal Tasks',
        owner: '1',
        visibility: 'private',
        tasks: [],
        collaborators: [],
        labels: []
    }
];

// Mock Tasks
const mockTasks: ITask[] = [
    {
        id: '1',
        name: 'Design homepage',
        description: 'Create modern and responsive design for the homepage',
        owner: '1',
        board: '1',
        status: 'in_progress',
        start_date: new Date(),
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        priority: 'high',
        label: '1',
        comments: []
    }
];

// Mock Labels
const mockLabels: ILabel[] = [
    {
        id: '1',
        name: 'Design',
        color: '#4CAF50',
        board: '1'
    },
    {
        id: '2',
        name: 'Development',
        color: '#2196F3',
        board: '1'
    }
];
```

## Integration Points

1. **API Configuration**
   ```typescript
   // In src/config/api.ts
   export const setApiConfig = (config: {
       baseUrl: string;
       endpoints: Record<string, string>;
   }) => {
       // Implementation to update API configuration
   };
   ```

2. **Authentication**
   ```typescript
   // In src/services/auth.ts
   export const setAuthConfig = (config: {
       loginEndpoint: string;
       registerEndpoint: string;
   }) => {
       // Implementation to update auth configuration
   };
   ```

3. **Error Handling**
   ```typescript
   // In src/services/error.ts
   export const setErrorHandler = (handler: (error: ApiError) => void) => {
       // Implementation to handle API errors
   };
   ```

4. **WebSocket Integration**
   ```typescript
   // In src/services/realtime.ts
   export const setupWebSocket = (url: string) => {
       // Implementation for real-time updates
   };
   ```

## Development Notes

1. **State Management**
   - Use Redux Toolkit for global state
   - Implement optimistic updates
   - Cache frequently accessed data
   - Handle offline scenarios

2. **Performance**
   - Implement virtual scrolling
   - Lazy load components
   - Cache API responses
   - Optimize drag-and-drop

3. **Testing**
   - Unit tests for components
   - Integration tests for drag-and-drop
   - E2E tests for workflows
   - Performance benchmarks

This prompt provides a comprehensive structure for Lovable to generate a complete frontend application with:
- Modern UI components
- Drag-and-drop functionality
- Well-defined data models
- Backend integration hooks
- Mock data for development
- Clear integration points
- Performance optimizations

The generated application should be ready for production while maintaining flexibility for backend integration.
