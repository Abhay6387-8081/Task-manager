import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListTodo, Columns3, User } from "lucide-react";

const LINKS = [
  { to: "/", icon: LayoutDashboard, label: "Home", end: true },
  { to: "/tasks", icon: ListTodo, label: "Tasks" },
  { to: "/task", icon: Columns3, label: "Board" },
  { to: "/profile", icon: User, label: "Profile" },
];

function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ink-300/40 flex items-center justify-around py-2">
      {LINKS.map(({ to, icon: Icon, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-[10px] font-medium ${
              isActive ? "text-brand-600" : "text-ink-500"
            }`
          }
        >
          <Icon size={20} />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNav;
