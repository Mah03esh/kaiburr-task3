# Kaiburr Assessment - Task 3
## Web UI for Task Management

A React-based frontend application providing a user interface for managing tasks via the Kaiburr REST API. Built with modern web technologies and responsive design.

## Technology Stack

- React 18.2.0
- TypeScript 5.2.2
- Ant Design 5.12.0 (UI Components)
- Axios 1.6.0 (HTTP Client)
- Vite 5.0.8 (Build Tool)
- Tailwind CSS (Styling)

## Features

- View all tasks in a sortable, paginated table
- Search tasks by name
- Create new tasks with form validation
- Execute tasks and view command output
- Delete tasks with confirmation
- View execution history with timestamps
- Responsive design for all screen sizes
- Real-time API integration

## Prerequisites

- Node.js 16 or higher
- npm package manager
- Backend API running on `http://localhost:8080` (Task 1)

## Installation & Setup

Clone the repository:
```bash
git clone https://github.com/Mah03esh/kaiburr-task3.git
cd kaiburr-task3
```

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

The application starts on `http://localhost:3000`

Build for production:
```bash
npm run build
```

## API Configuration

The frontend connects to the backend API. Update the API base URL in `src/services/api.ts` if needed:

```typescript
const API_BASE_URL = 'http://localhost:8080/api/tasks';
```

## Project Structure

```
task3/
├── src/
│   ├── components/
│   │   ├── TaskList.tsx       # Main task display component
│   │   └── TaskForm.tsx       # Task creation form
│   ├── services/
│   │   └── api.ts             # API integration layer
│   ├── App.tsx                # Root component
│   └── main.tsx               # Application entry point
├── public/
├── Dockerfile                 # Container configuration
├── nginx.conf                 # Production server config
├── package.json
└── vite.config.ts
```

## Components Overview

### TaskList Component
- Displays all tasks in Ant Design Table
- Implements search functionality
- Handles task execution and deletion
- Shows execution history in expandable rows
- Pagination and sorting support

### TaskForm Component
- Modal-based form for task creation
- Input validation
- Connects to PUT /api/tasks endpoint

### API Service
- Centralized HTTP client using Axios
- Error handling and response formatting
- Endpoints:
  - `getAllTasks()` - GET /api/tasks
  - `createTask()` - PUT /api/tasks
  - `executeTask()` - PUT /api/tasks/execute/{id}
  - `deleteTask()` - DELETE /api/tasks/{id}
  - `searchTasks()` - GET /api/tasks/find?name={name}

## Docker Deployment

Build the Docker image:
```bash
docker build -t kaiburr-task3-frontend .
```

Run the container:
```bash
docker run -p 3000:80 kaiburr-task3-frontend
```

The application uses a multi-stage build:
1. Build stage: Compiles React app with Vite
2. Production stage: Serves static files with nginx

## Testing & Validation

All UI interactions have been tested manually. Test scenarios follow the Given-When-Then syntax.

### Test Scenarios

**Scenario 1: Application Startup**  
Given Node.js and dependencies are installed  
When the development server starts via `npm run dev`  
Then the application loads on port 3000 and connects to the backend API  

**Scenario 2: View All Tasks**  
Given tasks exist in the backend database  
When the homepage loads  
Then all tasks are displayed in a table with columns for name, owner, command, and actions  

**Scenario 3: Search Tasks by Name (Success)**  
Given tasks with matching names exist  
When a user enters a search term in the search input  
Then the table filters to show only matching tasks  

**Scenario 4: Search Tasks by Name (Not Found)**  
Given no tasks match the search criteria  
When a user enters a non-existent task name  
Then the table displays "No Data" message  

**Scenario 5: Create New Task**  
Given the user clicks "Create Task" button  
When the form is filled with name, owner, and command  
Then a PUT request is sent and the new task appears in the table  

**Scenario 6: Execute Task**  
Given a task exists in the table  
When the user clicks the "Execute" button  
Then the command runs and execution details appear in the expanded row  

**Scenario 7: Delete Task**  
Given a task exists in the table  
When the user clicks "Delete" and confirms  
Then the task is removed from the database and table  

**Scenario 8: View Execution History**  
Given a task has been executed  
When the user expands the task row  
Then execution history shows startTime, endTime, and output

## Project Structure

```
task3/
├── public/                  # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── TaskForm.tsx   # Create task modal form
│   │   └── TaskList.tsx   # Main task list view
│   ├── models/            # TypeScript interfaces
│   │   └── Task.ts        # Task & TaskExecution models
│   ├── services/          # API service layer
│   │   └── API.ts         # Backend API calls
│   ├── App.tsx            # Main app component
│   ├── App.css            # App styles
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── screenshots/           # Application screenshots
├── index.html            # HTML entry point
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── README.md             # This file
```

## Author

Mahesh  
Created for Kaiburr Assessment - Task 3

## License

This project is created for assessment purposes.

To preview the production build:

```bash
npm run preview
```

## How to Use the Application

### 1. View All Tasks

- When you open the application, all existing tasks are automatically displayed in a table
- The table shows: Task Name, Owner, Command, Execution Count, and Action buttons
- Use pagination controls at the bottom to navigate through multiple pages

### 2. Search for Tasks

- Use the search bar at the top to find tasks by name
- Type your search term and press Enter or click the search button
- Click the "X" icon to clear the search and show all tasks again

### 3. Create a New Task

1. Click the **"Create Task"** button in the top-right corner
2. Fill in the form fields:
   - **Task Name**: A descriptive name for your task (minimum 3 characters)
   - **Owner**: The person responsible for the task (minimum 2 characters)
   - **Command**: The shell command to execute (e.g., `echo Hello World`)
3. Click **"Create"** to submit
4. A success message will appear, and the task will be added to the list

**Note**: The backend blocks dangerous commands like `rm`, `sudo`, `shutdown`, etc. for security.

### 4. Run a Task

1. Find the task you want to execute in the table
2. Click the **"Run"** button (play icon) in the Actions column
3. The command will execute on the backend
4. A success notification will appear
5. The execution count will increase

### 5. View Execution History

1. After running a task, click the **"View Output"** button
2. A modal will open showing all execution details:
   - Start time and end time
   - Command output (stdout/stderr)
   - Multiple executions are shown in separate cards
3. Click **"Close"** to return to the main view

### 6. Delete a Task

1. Find the task you want to delete
2. Click the **"Delete"** button (trash icon) in the Actions column
3. Confirm the deletion in the popup dialog
4. The task will be removed from the list

### 7. Refresh the List

Click the **"Refresh"** button in the top-right corner to reload all tasks from the backend.

## API Endpoints Used

| Action | Method | Endpoint | Description |
|--------|--------|----------|-------------|
| Get All Tasks | GET | `/api/tasks` | Fetch all tasks |
| Search Tasks | GET | `/api/tasks/find?name={searchTerm}` | Search by name |
| Get Task by ID | GET | `/api/tasks?id={id}` | Get single task |
| Create Task | PUT | `/api/tasks` | Create new task |
| Delete Task | DELETE | `/api/tasks/{id}` | Delete a task |
| Execute Task | PUT | `/api/tasks/execute/{id}` | Run task command |

## Screenshots

### 1. Main Task List View
![Main Task List](screenshots/1.png)
*Screenshot showing the main task list with the search bar, Create Task button, and task table. Display system date/time visible in corner.*

### 2. Search Functionality
![Search Tasks](screenshots/2.png)
*Screenshot demonstrating the search feature with results filtered by name.*

### 3. Create Task Form
![Create Task Form](screenshots/3.png)
*Screenshot of the Create Task modal with all form fields filled in.*

### 4. Task Execution
![Execute Task](screenshots/4.png)
*Screenshot showing a task being executed with success notification.*

### 5. Execution History View
![Execution History](screenshots/5.png)
*Screenshot of the execution history modal showing command output and timestamps.*

### 6. Delete Task Confirmation
![Delete Confirmation](screenshots/6.png)
*Screenshot showing the delete confirmation dialog.*



## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Clear visual focus indicators
- **Form Validation**: Clear error messages and validation feedback
- **Responsive Design**: Works on all screen sizes and devices

## Troubleshooting

### Backend Connection Issues

If you see "Failed to fetch tasks" errors:

1. Verify the backend is running: `http://localhost:8080/api/tasks`
2. Check for CORS issues in the browser console
3. Ensure MongoDB is connected in the backend

### Port Already in Use

If port 3000 is already in use:
1. Kill the process using port 3000
2. Or modify `vite.config.ts` to use a different port



## Author

**Mahesh**  
Created for Kaiburr Assessment - Task 3

## License

This project is created for assessment purposes.



## License

This project is created for assessment purposes.
