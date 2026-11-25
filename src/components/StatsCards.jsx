import React from 'react';
const cards = [
  { key:'total', label:'Total tasks', icon:'▤', tone:'violet' },
  { key:'pending', label:'In progress', icon:'◷', tone:'blue' },
  { key:'completed', label:'Completed', icon:'✓', tone:'green' },
  { key:'overdue', label:'Overdue', icon:'!', tone:'orange' }
];
export default function StatsCards({ stats }) {
  const progress = stats.total ? Math.round(stats.completed / stats.total * 100) : 0;
  return <section className="stats-grid" aria-label="Task summary">
    {cards.map(card => <article className="stat-card" key={card.key}><div className={`stat-icon ${card.tone}`}>{card.icon}</div><div><p>{card.label}</p><strong>{stats[card.key]}</strong></div></article>)}
    <article className="progress-card"><div className="progress-top"><span>Overall progress</span><strong>{progress}%</strong></div><div className="progress-track"><div className="progress-fill" style={{width:`${progress}%`}}/></div><small>{stats.completed} of {stats.total} tasks completed</small></article>
  </section>;
}
