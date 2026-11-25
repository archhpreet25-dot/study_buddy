import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import StatsCards from './components/StatsCards.jsx';
import TaskForm from './components/TaskForm.jsx';
import TaskToolbar from './components/TaskToolbar.jsx';
import TaskList from './components/TaskList.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { isOverdue } from './utils/taskHelpers.js';

const starterTasks = [
  { id: 'sample-1', title: 'Revise computer networks notes', subject: 'Computer Networks', dueDate: '', priority: 'High', completed: false },
  { id: 'sample-2', title: 'Complete JavaScript practice', subject: 'Web Development', dueDate: '', priority: 'Medium', completed: true }
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage('studybuddy-tasks', starterTasks);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const stats = useMemo(() => {
    const completed = tasks.filter(task => task.completed).length;
    const overdue = tasks.filter(task => !task.completed && isOverdue(task.dueDate)).length;
    return { total: tasks.length, completed, pending: tasks.length - completed, overdue };
  }, [tasks]);

  const visibleTasks = useMemo(() => tasks.filter(task => {
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || task.title.toLowerCase().includes(query) || task.subject.toLowerCase().includes(query);
    const matchesFilter = filter === 'All' ||
      (filter === 'Pending' && !task.completed) ||
      (filter === 'Completed' && task.completed) ||
      (filter === 'Overdue' && !task.completed && isOverdue(task.dueDate));
    return matchesSearch && matchesFilter;
  }).sort((a, b) => Number(a.completed) - Number(b.completed) || (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31')), [tasks, filter, search]);

  function addTask(details) {
    setTasks(current => [{ ...details, id: crypto.randomUUID(), completed: false }, ...current]);
  }
  function toggleTask(id) {
    setTasks(current => current.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  }
  function deleteTask(id) {
    setTasks(current => current.filter(task => task.id !== id));
  }

  return <div className="app-shell"><div className="page-container">
    <Header />
    <main>
      <section className="welcome-row">
        <div><p className="eyebrow">YOUR PERSONAL STUDY SPACE</p><h2>Make today <span>count.</span></h2><p className="welcome-copy">Plan your work, stay on track, and make steady progress.</p></div>
        <div className="date-chip"><span className="date-dot"/> {new Date().toLocaleDateString(undefined, { weekday:'long', month:'short', day:'numeric' })}</div>
      </section>
      <StatsCards stats={stats}/>
      <section className="workspace">
        <div className="section-heading"><div><p className="eyebrow">STAY ORGANIZED</p><h2>Your tasks</h2></div><span className="task-count">{stats.pending} pending</span></div>
        <TaskForm onAddTask={addTask}/>
        <TaskToolbar filter={filter} onFilterChange={setFilter} search={search} onSearchChange={setSearch}/>
        <TaskList tasks={visibleTasks} onToggle={toggleTask} onDelete={deleteTask}/>
      </section>
    </main>
    <footer>Made for focused learning <span>✦</span> StudyBuddy</footer>
  </div></div>;
}
