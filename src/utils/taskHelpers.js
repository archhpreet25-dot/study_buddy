export function isOverdue(dueDate) {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(`${dueDate}T00:00:00`) < today;
}

export function formatDueDate(dueDate) {
  if (!dueDate) return 'No deadline';
  return new Date(`${dueDate}T00:00:00`).toLocaleDateString(undefined, { day:'numeric', month:'short', year:'numeric' });
}
