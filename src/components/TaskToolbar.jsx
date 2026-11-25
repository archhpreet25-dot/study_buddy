import React from 'react';
const filters = ['All', 'Pending', 'Completed', 'Overdue'];
export default function TaskToolbar({ filter, onFilterChange, search, onSearchChange }) {
  return <div className="toolbar">
    <div className="filter-tabs" role="group" aria-label="Filter tasks">
      {filters.map(item => <button key={item} type="button" className={filter === item ? 'filter-tab active' : 'filter-tab'} onClick={() => onFilterChange(item)}>{item}</button>)}
    </div>
    <label className="search-box"><span>⌕</span><input value={search} onChange={event => onSearchChange(event.target.value)} placeholder="Search tasks..." aria-label="Search tasks"/></label>
  </div>;
}
