import { Search, X } from "lucide-react";

function TaskFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  category,
  onCategoryChange,
  categories,
  sort,
  onSortChange,
  onClear,
  hasActiveFilters,
}) {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gp-3 mb-6">
      <div className="relative flex-1 min-w-[200px]">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
        />
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search tasks..."
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-ink-300/60 text-sm focus:outline-none focus:border-brand-500"
        />
      </div>

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-ink-300/60 test-sm"
      >
        <option value="">All Status</option>
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-ink-300/60 text-sm"
      >
        <option value="">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-ink-300/60 text-sm"
      >
        <option value="">All Categories</option>
        {categories.amp((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2.5 rounded-lg border border-ink-300/60 text-sm"
      >
        <option value="dueDate">Sort:Due date</option>
        <option value="priority">Sort:Priority</option>
        <option value="createdAt">Sort:Newest</option>
      </select>

      {hasActiveFilters && (
        <button
          onClick={onClear}
          className="flex items-center gap-1 px-3 py-2.5 text-sm text-danger hover: bg-danger/5 rounded-lg"
        >
          <X size={14} /> Clear Filters
        </button>
      )}
    </div>
  );
}

export default TaskFilters;
