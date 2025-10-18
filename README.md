# Kaiburr Assessment - Task 3
## Web UI Forms for Task Management

A modern, responsive React-based web frontend for the Kaiburr Task Management API. Built with React 18, TypeScript, and Ant Design components.

## Technology Stack

- **React**: 18.2.0 (Functional Components with Hooks)
- **TypeScript**: 5.2.2
- **Ant Design**: 5.12.0 (UI Component Library)
- **Axios**: 1.6.0 (HTTP Client)
- **Vite**: 5.0.8 (Build Tool & Dev Server)
- **Day.js**: 1.11.10 (Date Formatting)

## Features

**View All Tasks** - Display all tasks in a responsive table with sorting and pagination  
**Search Tasks** - Find tasks by name with real-time search  
**Create Tasks** - Add new tasks with validation  
**Execute Tasks** - Run task commands and view results  
**Delete Tasks** - Remove tasks with confirmation  
**View Execution History** - See detailed command output and execution times  
**Responsive Design** - Works on desktop, tablet, and mobile devices  
**Accessible UI** - WCAG compliant with keyboard navigation support

## Prerequisites

Before running this application, ensure you have:

1. **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
2. **npm** package manager
3. **Backend API** running on `http://localhost:8080` (from Task 1)

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

## Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd d:\kaiburr\task3
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 3. Verify Backend is Running

Make sure the Task 1 backend API is running on `http://localhost:8080`:

```bash
# In the task1 directory
mvn spring-boot:run
```

### 4. Start the Development Server

Using npm:
```bash
npm run dev
```

The application will start on `http://localhost:3000` and automatically open in your browser.

## Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

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

