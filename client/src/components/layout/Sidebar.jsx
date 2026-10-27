import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  Columns3,
  User,
  CheckCircle2,
} from "lucide-react";

const LINKS = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/tasks", icon: ListTodo, label: "Tasks" },
  { to: "/task", icon: Columns3, label: "Task Board" },
  { to: "/profile", icon: User, label: "Profile" },
];

function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col bg-white border-r border-ink-300/40 min-h-screen p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
          <CheckCircle2 size={18} className="text-white" />
        </div>
        <span className="font-bold text-ink-900">Task Flow</span>
      </div>

      <nav className="flex flex-col gap-1">
        {LINKS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? "bg-brand-50 text-brand-700" : "text-ink-700 hover:bg-surface-bg"}`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
