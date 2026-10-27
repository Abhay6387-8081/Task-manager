import {ListTodo } from "lucide-react";
import {Link} from 'react-router-dom';
import { StatusBadge } from "../ui/Badge";
import EmptyState from "../ui/EmptyState";

function RecentTasks({ tasks }) {
  const recent = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No tasks yet"
        subtitle="Create your first task to get started."
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {recent.map((task) => (
        <Link
          key={task.id}
          to={`/tasks/${task.id}`}
          className="flex items-center justify-between p-3 rounded-lg border border-ink-300/30 hover:bg-surface-bg transition-colors"
        >
          <div className="min-w-0">
            <p className="text-sm font-medium text-ink-900 truncate">
              {task.title}
            </p>
            <p className="text-xs text-ink-500 mt-0.5">{task.category}</p>
          </div>
          <StatusBadge status={task.status} />
        </Link>
      ))}
    </div>
  );
}

export default RecentTasks;
