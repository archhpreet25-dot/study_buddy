import React from 'react';
import TaskItem from './TaskItem.jsx';
export default function TaskList({ tasks, onToggle, onDelete }) {
  if (!tasks.length) return <div className="empty-state"><div className="empty-icon">✦</div><h3>No tasks found</h3><p>Try another search or add a task to get started.</p></div>;
  return <div className="task-list">{tasks.map(task => <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete}/>)}</div>;
}
