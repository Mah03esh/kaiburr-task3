# Quick Start Guide - Kaiburr Task 3

## Prerequisites Check

Before starting, verify you have:
- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm or yarn installed (`npm --version`)
- [ ] Task 1 backend running on http://localhost:8080

## Installation (First Time Only)

```powershell
# Navigate to the project
cd d:\kaiburr\task3

# Install all dependencies
npm install
```

This will install:
- React 18
- TypeScript
- Ant Design
- Axios
- Vite
- And all other dependencies

## Running the Application

### Step 1: Start the Backend (Task 1)

```powershell
# In a separate terminal, go to task1 directory
cd d:\kaiburr\task1

# Start the backend
cmd /c '"C:\Program Files\apache-maven-3.9.11\bin\mvn.cmd" spring-boot:run'
```

### Step 2: Start the Frontend

```powershell
# In the task3 directory
npm run dev
```

The app will open automatically at `http://localhost:3000`

## Quick Test

1. **Create a Task**:
   - Click "Create Task"
   - Name: "Test Hello"
   - Owner: "Mahesh"
   - Command: "echo Hello from Task 3"
   - Click "Create"

2. **Run the Task**:
   - Click the "Run" button next to your task
   - Wait for success message

3. **View Output**:
   - Click "View Output" button
   - See the execution result

## Common Commands

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Troubleshooting

### "Failed to fetch tasks"
- Check if backend is running: http://localhost:8080/api/tasks
- Restart the backend

### Port 3000 already in use
- Stop other apps using port 3000
- Or change port in vite.config.ts

### Dependencies not found
```powershell
# Clean install
rm -r node_modules
rm package-lock.json
npm install
```

## File Overview

```
task3/
├── src/
│   ├── components/
│   │   ├── TaskForm.tsx      # Create task form
│   │   └── TaskList.tsx      # Main task list
│   ├── models/Task.ts        # TypeScript types
│   ├── services/API.ts       # Backend calls
│   └── App.tsx               # Main component
├── package.json              # Dependencies
└── README.md                 # Full documentation
```

## Next Steps

1. Read the full [README.md](README.md) for detailed documentation
2. Take screenshots for your submission
3. Test all features thoroughly
4. Push to GitHub

Good luck! 🚀
