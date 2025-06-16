# Task Management Frontend Design Specification for Lovable

## Project Overview

Create a modern, professional task management application frontend that closely resembles ClickUp's interface while integrating seamlessly with our backend API. The application should be built using React and TypeScript, following best practices for performance, accessibility, and user experience.

## API Integration Details

### Base Information
- Backend URL: `http://localhost:3000/api`
- Authentication: JWT token-based
- Response Format: JSON
- Error Handling: Standardized error responses with status codes

### Available Endpoints

#### User Authentication
- `POST /users/login` - Login user
  - Request: `{ email: string, password: string }`
  - Response: `{ token: string, user: { id, name, email } }`

#### Board Management
- `POST /boards` - Create board
  - Request: `{ name: string, owner: ObjectId, description?: string, visibility: "private" | "public" | "team" }`
- `GET /boards` - List boards
- `GET /boards/:id` - Get board details
- `PUT /boards/:id` - Update board
- `DELETE /boards/:id` - Delete board

#### Task Management
- `POST /tasks` - Create task
  - Request: `{ name: string, description: string, owner: ObjectId, board: ObjectId, status: string, start_date: Date, due_date: Date, priority: string, label: ObjectId }`
- `GET /tasks` - List tasks
- `GET /tasks/:id` - Get task details
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

#### Collaboration
- `POST /collaborators` - Add collaborator
  - Request: `{ user: ObjectId, board: ObjectId, role: "owner" | "editor" | "viewer" }`
- `GET /collaborators` - List collaborators
- `GET /collaborators/:id` - Get collaborator details
- `PUT /collaborators/:id` - Update collaborator role
- `DELETE /collaborators/:id` - Remove collaborator

#### Comments
- `POST /comments` - Create comment
  - Request: `{ content: string, task: ObjectId, author: ObjectId }`
- `GET /comments` - List comments
- `GET /comments/:id` - Get comment details
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

#### Labels
- `POST /labels` - Create label
  - Request: `{ name: string, color: string, board: ObjectId }`
- `GET /labels` - List labels
- `GET /labels/:id` - Get label details
- `PUT /labels/:id` - Update label
- `DELETE /labels/:id` - Delete label

## UI Design Requirements

### Color Scheme
- Primary: #2C3E50 (Dark Blue)
- Secondary: #3498DB (Blue)
- Accent: #E74C3C (Red)
- Background: #F5F6FA
- Text: #2C3E50
- Success: #27AE60
- Warning: #F1C40F
- Error: #E74C3C

### Layout Components

1. **Sidebar Navigation**
   - Fixed left sidebar
   - Logo at top
   - Navigation items:
     - Dashboard
     - Boards
     - Tasks
     - Labels
     - Users
     - Settings
   - User profile dropdown
   - Dark/Light mode toggle

2. **Header Bar**
   - Search bar
   - Quick actions (Create Task, Create Board)
   - Notifications
   - User profile

3. **Board View**
   - Kanban board layout
   - Draggable task cards
   - Status columns (To Do, In Progress, Review, Done)
   - Task card details:
     - Title
     - Description
     - Due date
     - Priority
     - Labels
     - Assignee

4. **Task Details Modal**
   - Full task information
   - Comments section
   - File attachments
   - Status updates
   - Labels management
   - Collaborators

5. **Calendar Integration**
   - Monthly view
   - Daily view
   - Task scheduling
   - Drag-and-drop task placement

6. **User Profile**
   - Profile picture
   - Name
   - Email
   - Role
   - Statistics (Completed tasks, Active tasks)

### Features Implementation

1. **Authentication Flow**
   - Login page with email/password
   - Remember me option
   - Session persistence
   - Token refresh mechanism

2. **Board Management**
   - Create, edit, delete boards
   - Board visibility settings
   - Collaborator management
   - Board sharing options

3. **Task Management**
   - Create tasks with rich text editor
   - Task priority levels
   - Due date and time
   - Recurring tasks
   - Task dependencies
   - Task history

4. **Collaboration**
   - Real-time updates
   - Task assignments
   - Comment notifications
   - Mention system
   - Activity feed

5. **Labels and Tags**
   - Custom labels with colors
   - Label hierarchy
   - Quick filtering
   - Label statistics

### Technical Requirements

1. **State Management**
   - Use Redux Toolkit for global state
   - RTK Query for API integration
   - Optimistic updates
   - Cache invalidation

2. **Performance**
   - Lazy loading of components
   - Infinite scrolling
   - Code splitting
   - Image optimization
   - WebSocket for real-time updates

3. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast
   - Focus management

4. **Responsive Design**
   - Mobile-first approach
   - Adaptive sidebar
   - Touch-friendly interfaces
   - Responsive grids
   - Mobile-specific optimizations

### Additional Features

1. **Notifications**
   - Real-time updates
   - Desktop notifications
   - Email notifications
   - Push notifications

2. **Analytics**
   - Task completion rates
   - User productivity
   - Time tracking
   - Team performance

3. **Customization**
   - Theme customization
   - Layout preferences
   - Keyboard shortcuts
   - Custom fields

### Development Guidelines

1. **Code Structure**
   ```
   src/
   ├── components/      # Reusable UI components
   ├── features/        # Feature-specific components
   ├── hooks/          # Custom React hooks
   ├── services/       # API integration
   ├── store/          # Redux store
   ├── utils/          # Helper functions
   ├── types/          # TypeScript interfaces
   └── styles/         # Global styles and themes
   ```

2. **Testing**
   - Unit tests for components
   - Integration tests for API
   - E2E testing with Cypress
   - Performance testing
   - Accessibility testing

3. **Deployment**
   - CI/CD pipeline
   - Environment configuration
   - Performance monitoring
   - Error tracking
   - Analytics integration

### Security Requirements

1. **Authentication**
   - JWT token validation
   - Session management
   - Password hashing
   - Rate limiting

2. **Data Protection**
   - Sensitive data encryption
   - Secure API calls
   - CSRF protection
   - XSS prevention

3. **Access Control**
   - Role-based access
   - Permission levels
   - Audit logging
   - Activity tracking

### Performance Optimization

1. **Frontend**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Caching strategy
   - Bundle optimization

2. **Backend Integration**
   - Efficient API calls
   - Batch requests
   - Data compression
   - Error handling
   - Retry mechanisms

### Documentation Requirements

1. **User Documentation**
   - Getting started guide
   - Feature tutorials
   - Keyboard shortcuts
   - API documentation
   - Troubleshooting guide

2. **Developer Documentation**
   - Code structure
   - API endpoints
   - State management
   - Component usage
   - Testing guidelines

### Additional Notes

1. **Performance Considerations**
   - Optimize for large datasets
   - Implement pagination
   - Use virtual scrolling
   - Cache frequently accessed data

2. **Scalability**
   - Design for growth
   - Modular architecture
   - Easy feature addition
   - Performance monitoring

3. **User Experience**
   - Intuitive interface
   - Quick actions
   - Clear feedback
   - Loading states
   - Error handling

This prompt provides a comprehensive guide for building a professional task management application that integrates seamlessly with your backend API. The design should be modern, user-friendly, and scalable, with a focus on performance and accessibility.
