# StudyBuddy — Student Task Manager

A simple, responsive React + JavaScript project that solves a real-world student problem: forgetting assignments, practical work and deadlines.

## Features
- Add tasks with subject, due date and priority
- Mark tasks as completed or pending
- Delete tasks
- Search by task or subject
- Filter all, pending, completed and overdue tasks
- Dashboard statistics and completion progress
- Saves tasks in browser `localStorage` (no backend required)
- Responsive layout for desktop and mobile

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP and open the project folder in a terminal.
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the local URL shown by Vite (usually http://localhost:5173).

## Build for production
```bash
npm run build
```

## Practical file explanation
- `src/main.jsx`: React entry point.
- `src/App.jsx`: dashboard, task state, add/toggle/delete, search and filters.
- `src/style.css`: responsive UI design.
- `localStorage`: stores task data in the same browser on the same device.

## Problem statement
Students often forget assignment deadlines and struggle to organise work from multiple subjects. StudyBuddy provides one dashboard to record tasks, set deadlines, prioritise work and track completion.

## Future scope
User login, cloud database, email reminders, calendar integration and multiple student profiles.
