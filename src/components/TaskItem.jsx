import React from 'react';
import { formatDueDate, isOverdue } from '../utils/taskHelpers.js';
export default function TaskItem({ task, onToggle, onDelete }) {
  const overdue = !task.completed && isOverdue(task.dueDate);
  return <article className={`task-item ${task.completed ? 'is-complete' : ''}`}>
    <button className={`task-check ${task.completed ? 'checked' : ''}`} type="button" onClick={() => onToggle(task.id)} aria-label={task.completed ? 'Mark task as pending' : 'Mark task as completed'}>{task.completed ? '✓' : ''}</button>
    <div className="task-main"><h3>{task.title}</h3><div className="task-meta"><span>{task.subject}</span><span className={overdue ? 'due overdue' : 'due'}>◷ {overdue ? 'Overdue · ' : ''}{formatDueDate(task.dueDate)}</span></div></div>
    <span className={`priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
    <button className="delete-button" type="button" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>×</button>
  </article>;
}
