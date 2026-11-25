# StudyBuddy — Student Task Manager

A responsive student task manager built with React, JavaScript, Vite, and CSS.

## Features
- Add tasks with subject, due date, and priority
- Mark tasks completed or pending; delete tasks
- Search by task name or subject
- Filter All, Pending, Completed, and Overdue
- Dashboard statistics and completion progress
- Save tasks in browser LocalStorage
- Responsive desktop and mobile layout

## Readable component structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── StatsCards.jsx
│   ├── TaskForm.jsx
│   ├── TaskToolbar.jsx
│   ├── TaskList.jsx
│   └── TaskItem.jsx
├── hooks/
│   └── useLocalStorage.js
├── utils/
│   └── taskHelpers.js
├── App.jsx
├── main.jsx
└── style.css
```

`App.jsx` manages shared state. Each component has one responsibility. The custom hook manages LocalStorage, and utility functions handle date logic.

## Run the project

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually http://localhost:5173.

## Build

```bash
npm run build
```

Tech: React 18, JavaScript, Vite, CSS, LocalStorage. No backend required.
