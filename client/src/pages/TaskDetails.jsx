import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Topbar from "../components/layout/Topbar";
import { StatusBadge, PriorityBadge } from "../components/ui/Badge";
import {
  ArrowLeft,
  Clock,
  Pencil,
  Trash2,
  Calendar,
  Tag as TagIcon,
} from "lucide-react";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/tasks/TaskForm";
import TaskForm from "../components/tasks/TaskForm";
import { useTaskContext } from "../hooks/useTaskContext";
import { useToast } from "../hooks/useToast";
import { formatDate, formatRelativeDue, isOverdue } from "../utils/dateHelpers";

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTaskContext();
  const { show } = useToast();

  const task = tasks.find((t) => t.id === id);

  const [showForm, setShowForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!task) {
    return (
      <>
        <Topbar title="Task Not Found" />
        <div className="p-6 text-center text-ink-500">
          This task doesn't exist or was deleted.
          <div>
            <Link to="/tasks" className="text-brand-600 font-medium">
              Back to Tasks
            </Link>
          </div>
        </div>
      </>
    );
  }

  async function handleFormSubmit(data) {
    setSubmitting(true);
    try {
      updateTask(task.id, data);
      show("Task updated");
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  }

  function handleDelete() {
    deleteTask(task.id);
    show("Task deleted");
    navigate("/tasks");
  }

  return (
    <>
      <Topbar title="Task Details" />
      <div className="p-6 max-w-2xl mx-auto">
        <Link
          to="/tasks"
          className="inline-flex items-center gap-1 text-sm text-ink-500 hover:text-ink-900 mb-4"
        >
          <ArrowLeft size={14} /> Back to Tasks
        </Link>

        <div className="rounded-card border border-ink-300/40 bg-white p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-xl font-bold text-ink-900">{task.title}</h1>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowForm(true)}
              >
                <Pencil size={14} />
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <StatusBadge status={task.status} />
            <PriorityBadge status={task.priority} />
            {task.category && (
              <span className="text-[11px] px-2 py-1 rounded-full bg-ink-300/20 text-ink-700">
                {task.category}
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-sm text-ink-700 leading-related mb-6">
              {task.description}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {task.dueDate && (
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-ink-500" />
                <span
                  className={
                    isOverdue(task) ? "text-danger font-medium" : "text-ink-700"
                  }
                >
                  {formatRelativeDue(task.dueDate)}
                </span>
              </div>
            )}
            {task.estimatedDuration && (
              <div className="flex items-center gap-2 text-ink-700">
                <Clock size={14} className="text-ink-500" />{" "}
                {task.estimatedDuration} minutes estimated
              </div>
            )}
          </div>

          {task.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap mt-5">
              <TagIcon size={14} className="text-ink-500" />
              {task.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-1 rounded-full bg-brand-50 text-brand-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-ink-300/30 text-xs text-ink-500 flex flex-wrap gap-4">
            <span>Created:{formatDate(task.createdAt)}</span>
            {task.completedAt && (
              <span>Completed:{formatDate(task.completedAt)}</span>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title="Edit Task"
      >
        <TaskForm
          initialData={task}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
          submitting={submitting}
        />
      </Modal>

      <ConfirmDialog
        open={confirmDelete}
        title="Delete Task"
        message={`Delete "${task.title}"?This cannot be undone.`}
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  );
}

export default TaskDetails;
