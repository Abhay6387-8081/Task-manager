import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { PriorityBadge } from "../ui/Badge";
import { formatRelativeDue, isOverdue } from "../../utils/dateHelpers";

function KandanCard({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-lg border border-ink-300/40 bg-white p-3 cursor-grab active:cursor-grabbing touch-none"
    > 
      <Link to={`/tasks/${task.id}`} onClick={(e)=>e.stopPropagation()} className="text-sm font-medium text-ink-900 hover:text-brand-600 line-clamp-2 mb-2 block">{task.title}</Link>
      <div className='flex items-center justify-between'>
        <PriorityBadge priority={task.priority} />
        {task.dueDate && (
          <span
            className={`flex items-center gap-1 text-[11px] ${isOverdue(task) ? "text-danger font-medium" : "text-ink-500"}`}
          >
            <Calendar size={11} />
            {formatRelativeDue(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
}

export default KandanCard;
