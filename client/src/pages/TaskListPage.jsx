import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import Topbar from "../components/layout/Topbar";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import TaskFilters from "../components/tasks/TaskFilters";
import TaskForm from "../components/tasks/TaskForm";
import TaskList from "../components/tasks/TaskList";
import Pagination from "../components/ui/Pagination";
import { useTaskContext } from "../hooks/useTaskContext";
import { useToast } from "../hooks/useToast";
import { boolean, date } from "zod";

const PAGE_SIZE = 6;

function TaskListPage() {
  const { tasks, addTask, updateTask, deleteTask } = useTaskContext();
  const { show } = useToast();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("dueDate");
  const [page, setPage] = useState(1);

  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const categories = useMemo(
    () => [...new Set(tasks.map((t) => t.category).filter(boolean))],
    [tasks],
  );
  const hasActiveFilters = !!(search || status || priority || category);

  function clearFilters() {
    setSearch("");
    setStatus("");
    setPriority("");
    setCategory("");
    setPage("");
  }

  const filtered = useMemo(() => {
    let result = [...tasks];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q),
      );
    }
    if (status) result = result.filter((t) => t.status === status);
    if (priority) result = result.filter((t) => t.priority === priority);
    if (category) result = result.filter((t) => t.category === category);

    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (sort === "dueDate") {
      result.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new date(b.dueDate);
      });
    } else if (sort === "priority") {
      result.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
      );
    } else if (sort === "createdAt") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return result;
  }, [tasks, search, status, priority, category, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function openCreate() {
    setEditTarget(null);
    setShowForm(true);
  }
  function openEdit(task) {
    setEditTarget(task);
    setShowForm(true);
  }

  async function handleFormSubmit(data) {
    setSubmitting(true);
    try {
      if (editTarget) {
        updateTask(editTarget.id, data);
        show("Task updated");
      } else {
        addTask(data);
        show("Task created");
      }
      setShowForm(false);
      setEditTarget(null);
    } finally {
      setSubmitting(false);
    }
  }

  function handleDelete() {
    deleteTask(deleteTarget.id);
    show("Task deleted");
    setDeleteTarget(null);
  }

  return (
    <>
      <Topbar
        title="Tasks"
        action={
          <Button onClick={openCreate}>
            <Plus size={16} />
            New Task
          </Button>
        }
      />
      <div className="p-6">
        <TaskFilters
          search={search}
          onSearchChange={(v) => {
            setSearch(v);
            setPage(1);
          }}
          status={status}
          onStatusChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
          priority={priority}
          onPriorityChange={(v) => {
            setPriority(v);
            setPage(1);
          }}
          category={category}
          onCategoryChange={(v) => {
            setCategory(v);
            setPage(1);
          }}
          categories={categories}
          sort={sort}
          onSortChange={setSort}
          onClear={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        <TaskList
          tasks={paginated}
          onEdit={openEdit}
          onDelete={setDeleteTarget}
          hasActiveFilters={hasActiveFilters}
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>

      <Modal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={editTarget ? "Edit Task" : "New Task"}
      >
        <TaskForm
          initialData={editTarget}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowForm(false)}
          submitting={submitting}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete Task"
        message={`Delete "${deleteTarget?.title}"?This cannot be undone.`}
        confirmLabel="delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}

export default TaskListPage;
