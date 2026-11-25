import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  CheckCircle2,
  Circle,
  Clock3,
  Plus,
  Search,
  LayoutDashboard,
  ListTodo,
  CalendarDays,
  Trash2,
  X,
  Sparkles,
  AlertCircle,
  GraduationCap,
  Filter,
} from "lucide-react";

const starterTasks = [
  {
    id: 1,
    title: "Complete computer network assignment",
    subject: "Computer Networks",
    due: "2026-11-27",
    priority: "High",
    done: false,
  },
  {
    id: 2,
    title: "Revise JavaScript functions",
    subject: "Web Development",
    due: "2026-11-28",
    priority: "Medium",
    done: false,
  },
  {
    id: 3,
    title: "Prepare practical file",
    subject: "Practical Work",
    due: "2026-11-25",
    priority: "High",
    done: true,
  },
  {
    id: 4,
    title: "Read chapter 4 notes",
    subject: "Operating Systems",
    due: "2026-11-30",
    priority: "Low",
    done: false,
  },
];

const today = () => new Date().toISOString().slice(0, 10);
const prettyDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("studybuddy-tasks")) || starterTasks
      );
    } catch {
      return starterTasks;
    }
  });
  const [filter, setFilter] = useState("All tasks");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subject: "",
    due: today(),
    priority: "Medium",
  });

  useEffect(
    () => localStorage.setItem("studybuddy-tasks", JSON.stringify(tasks)),
    [tasks],
  );

  const completed = tasks.filter((t) => t.done).length;
  const pending = tasks.length - completed;
  const overdue = tasks.filter((t) => !t.done && t.due < today()).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  const visibleTasks = useMemo(
    () =>
      tasks
        .filter(
          (t) =>
            filter === "All tasks" ||
            (filter === "Pending" && !t.done) ||
            (filter === "Completed" && t.done) ||
            (filter === "Overdue" && !t.done && t.due < today()),
        )
        .filter((t) =>
          `${t.title} ${t.subject}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
        .sort((a, b) => a.done - b.done || a.due.localeCompare(b.due)),
    [tasks, filter, search],
  );

  function addTask(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    setTasks((current) => [
      { ...form, id: Date.now(), done: false },
      ...current,
    ]);
    setForm({ title: "", subject: "", due: today(), priority: "Medium" });
    setShowForm(false);
    setFilter("All tasks");
  }

  function toggleTask(id) {
    setTasks((current) =>
      current.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((t) => t.id !== id));
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <GraduationCap size={22} />
          </div>
          <span>
            Study<span className="brand-accent">Buddy</span>
          </span>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav>
          <button className="nav-item active">
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            className={`nav-item ${filter === "All tasks" ? "selected" : ""}`}
            onClick={() => setFilter("All tasks")}
          >
            <ListTodo size={18} /> All tasks{" "}
            <span className="nav-count">{tasks.length}</span>
          </button>
          <button
            className={`nav-item ${filter === "Pending" ? "selected" : ""}`}
            onClick={() => setFilter("Pending")}
          >
            <Clock3 size={18} /> Pending
          </button>
          <button
            className={`nav-item ${filter === "Completed" ? "selected" : ""}`}
            onClick={() => setFilter("Completed")}
          >
            <CheckCircle2 size={18} /> Completed
          </button>
          <button
            className={`nav-item ${filter === "Overdue" ? "selected" : ""}`}
            onClick={() => setFilter("Overdue")}
          >
            <AlertCircle size={18} /> Overdue
          </button>
        </nav>
        <div className="sidebar-bottom">
          <div className="tip-card">
            <div className="tip-icon">
              <Sparkles size={17} />
            </div>
            <strong>Small steps, big results.</strong>
            <p>Stay consistent and make progress every day.</p>
          </div>
          <div className="profile">
            <div className="avatar">S</div>
            <div>
              <strong>Student Workspace</strong>
              <small>Personal account</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div>
            <div className="eyebrow">YOUR PERSONAL STUDY SPACE</div>
            <h1>Dashboard</h1>
            <p className="welcome">
              Welcome back! Here's your productivity overview.
            </p>
          </div>
          <button className="primary-btn" onClick={() => setShowForm(true)}>
            <Plus size={18} /> Add new task
          </button>
        </header>

        <section className="stats-grid">
          <StatCard
            icon={<ListTodo size={19} />}
            label="Total tasks"
            value={tasks.length}
            note="All your study tasks"
            tone="blue"
          />
          <StatCard
            icon={<Clock3 size={19} />}
            label="Pending"
            value={pending}
            note="Waiting to be completed"
            tone="orange"
          />
          <StatCard
            icon={<CheckCircle2 size={19} />}
            label="Completed"
            value={completed}
            note="Great work so far!"
            tone="green"
          />
          <StatCard
            icon={<AlertCircle size={19} />}
            label="Overdue"
            value={overdue}
            note="Need your attention"
            tone="red"
          />
        </section>

        <section className="content-grid">
          <div className="panel tasks-panel">
            <div className="panel-heading">
              <div>
                <h2>My tasks</h2>
                <p>Organise your work and stay on track.</p>
              </div>
              <button className="small-add" onClick={() => setShowForm(true)}>
                <Plus size={16} /> Add task
              </button>
            </div>
            <div className="toolbar">
              <div className="search-box">
                <Search size={17} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tasks or subjects..."
                />
              </div>
              <div className="filter-label">
                <Filter size={15} />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option>All tasks</option>
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
            <div className="task-list">
              {visibleTasks.length ? (
                visibleTasks.map((task) => (
                  <article
                    className={`task-row ${task.done ? "is-done" : ""}`}
                    key={task.id}
                  >
                    <button
                      className="check-button"
                      onClick={() => toggleTask(task.id)}
                      aria-label={task.done ? "Mark pending" : "Mark completed"}
                    >
                      {task.done ? (
                        <CheckCircle2 size={21} />
                      ) : (
                        <Circle size={21} />
                      )}
                    </button>
                    <div className="task-info">
                      <strong>{task.title}</strong>
                      <div className="task-meta">
                        <span>
                          <BookOpen size={13} /> {task.subject || "General"}
                        </span>
                        <span>
                          <CalendarDays size={13} /> {prettyDate(task.due)}
                        </span>
                      </div>
                    </div>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    {!task.done && task.due < today() && (
                      <span className="overdue-tag">Overdue</span>
                    )}
                    <button
                      className="delete-button"
                      onClick={() => deleteTask(task.id)}
                      aria-label="Delete task"
                    >
                      <Trash2 size={16} />
                    </button>
                  </article>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">
                    <ListTodo size={24} />
                  </div>
                  <strong>No tasks found</strong>
                  <p>Try another filter or add a new task.</p>
                  <button onClick={() => setShowForm(true)}>
                    Create your first task
                  </button>
                </div>
              )}
            </div>
            <div className="list-footer">
              Showing <strong>{visibleTasks.length}</strong> of{" "}
              <strong>{tasks.length}</strong> tasks
            </div>
          </div>

          <div className="right-column">
            <div className="panel progress-panel">
              <div className="panel-heading">
                <div>
                  <h2>Study progress</h2>
                  <p>Your overall completion</p>
                </div>
                <div className="progress-icon">
                  <Sparkles size={18} />
                </div>
              </div>
              <div className="progress-number">
                {progress}
                <span>%</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="progress-caption">
                <span>{completed} completed</span>
                <span>{pending} remaining</span>
              </div>
              <div className="progress-message">
                {progress === 100 && tasks.length
                  ? "Amazing! You completed everything."
                  : progress >= 50
                    ? "You are making great progress. Keep going!"
                    : "Every completed task moves you forward."}
              </div>
            </div>
            <div className="quote-card">
              <div className="quote-mark">“</div>
              <p>The secret of getting ahead is getting started.</p>
              <span>— Mark Twain</span>
            </div>
            <div className="help-card">
              <div className="help-icon">
                <CalendarDays size={19} />
              </div>
              <div>
                <strong>Stay organised</strong>
                <p>
                  Add deadlines to your tasks so you always know what to work on
                  next.
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer>
          StudyBuddy <span>•</span> Built with React & JavaScript <span>•</span>{" "}
          Your tasks are saved on this device
        </footer>
      </main>

      {showForm && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) =>
            e.target === e.currentTarget && setShowForm(false)
          }
        >
          <form className="task-modal" onSubmit={addTask}>
            <div className="modal-heading">
              <div>
                <div className="eyebrow">PLAN YOUR WORK</div>
                <h2>Create a new task</h2>
              </div>
              <button
                type="button"
                className="close-btn"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>
            <label>
              Task title
              <input
                autoFocus
                required
                maxLength="100"
                placeholder="e.g. Complete assignment"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </label>
            <label>
              Subject or category
              <input
                placeholder="e.g. Computer Networks"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </label>
            <div className="form-row">
              <label>
                Due date
                <input
                  required
                  type="date"
                  value={form.due}
                  onChange={(e) => setForm({ ...form, due: e.target.value })}
                />
              </label>
              <label>
                Priority
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </label>
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button className="primary-btn" type="submit">
                <Plus size={17} /> Create task
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, note, tone }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-note">{note}</div>
    </div>
  );
}

export default App;
