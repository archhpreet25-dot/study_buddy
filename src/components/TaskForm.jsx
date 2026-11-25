import React, { useState } from 'react';
const initialForm = { title:'', subject:'', dueDate:'', priority:'Medium' };
export default function TaskForm({ onAddTask }) {
  const [form, setForm] = useState(initialForm);
  function updateField(event) {
    setForm(current => ({ ...current, [event.target.name]:event.target.value }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;
    onAddTask({ ...form, title:form.title.trim(), subject:form.subject.trim() || 'General' });
    setForm(initialForm);
  }
  return <form className="task-form" onSubmit={handleSubmit}>
    <div className="form-title"><span className="plus-icon">＋</span><div><strong>Add a new task</strong><small>Break your goals into manageable steps</small></div></div>
    <div className="form-grid">
      <label className="field title-field">Task name<input name="title" value={form.title} onChange={updateField} placeholder="e.g. Prepare for tomorrow's exam" maxLength="100" required/></label>
      <label className="field">Subject / category<input name="subject" value={form.subject} onChange={updateField} placeholder="e.g. Mathematics" maxLength="50"/></label>
      <label className="field">Due date<input type="date" name="dueDate" value={form.dueDate} onChange={updateField}/></label>
      <label className="field">Priority<select name="priority" value={form.priority} onChange={updateField}><option>Low</option><option>Medium</option><option>High</option></select></label>
      <button className="add-button" type="submit">＋ Add task</button>
    </div>
  </form>;
}
