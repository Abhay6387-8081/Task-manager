import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Inbox } from "lucide-react";
import KandanCard from "./KandanCard";
import EmptyState from "../ui/EmptyState";

const COLUMN_CONFIG = {
  todo: { label: "To Do", dot: "bg-status-todo" },
  "in-progress": { label: "In Progress", dot: "bg-status-progress" },
  completed: { label: "Completed", dot: "bg-status-completed" },
};

function KandanColumn({ id, tasks }) {
  const { setNodeRef } = useDroppable({ id });
  const config = COLUMN_CONFIG[id];

  return (
    <div className="flex-1 min-w-[260px] bg-surface-bg rounded-card p-3">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
        <h3 className="text-sm font-semibold text-ink-900">{config.label}</h3>
        <span className="text-xs text-ink-500 ml-auto">{tasks.length}</span>
      </div>

      <div ref={setNodeRef} className="flex flex-col gap-2 min-h-[120px]">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <KandanCard key={task.id} task={task} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="py-6">
            <EmptyState icon={Inbox} title="No tasks" subtitle="" />
          </div>
        )}
      </div>
    </div>
  );
}

export default KandanColumn;
