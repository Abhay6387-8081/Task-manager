import { ListTodo } from "lucide-react";
import TaskCard from "./TaskCard";
import EmptyState from "../ui/EmptyState";

function TaskList({ tasks, onEdit, onDelete, hasActiveFilters }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title={
          hasActiveFilters ? "No tasks match your filters" : "No tasks yet"
        }
        subtitle={
          hasActiveFilters
            ? "try adjusting or clearing your filters."
            : "Create your first task to get started."
        }
      />
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;
