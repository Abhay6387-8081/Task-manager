import { Calendar, Clock, Link, Pencil, Trash2 } from "lucide-react";
import {PriorityBadge, StatusBadge} from '../ui/Badge';
import {formatRelativeDue, isOverdue} from '../../utils/dateHelpers'


function TaskCard({task,onEdit,onDelete}){
    return(
        <div className="rounded-card border border-ink-300/40 bg-white p-4 hover:shadow-card transition-shadow">
            <div className="flex items-start justify-between gap-3 mb-2">
                <Link to={`/tasks/${task.id} `} className="text-sm font-semibold text-ink-900 hover:text-brand-600 line-clamp-1">
                {task.title}
                </Link>
                <div className="flex gap-1 shrink-0">
                    <button onClick={()=>onEdit(task)} className="p-1.5 text-ink-500 hover:text-brand-600" aria-label="Edit task">
                        <Pencil size={14}/>
                    </button>
                    <button onClick={()=>onDelete(task)} className="p-1.5 text-ink-500 hover:text-danger" aria-label="Delete task">
                        <Trash2 size={14}/>
                    </button>
                </div>
            </div>
            {task.description && <p className="text-xs text-ink-500 line-clamp-2mb-3">{task.description}</p>}

            <div className="flex flex-wrap items-center gap-2 mb-3">
                <StatusBadge status={task.status}/>
                <PriorityBadge priority={task.priority}/>
                {task.category &&(
                    <span className="text-[11px] px-2 py-1 rounded-full bg-ink-300/20 text-ink-700">{task.category}</span>
                )}
            </div>

            <div className="flex items-center gap-4 text-xs text-ink-500">
                {task.dueDate &&(
                    <span className={`flex items-center gap-1 ${isOverdue(task) ? 'task-danger font-medium':''}`}>
                        <Calendar size={12}/> {formatRelativeDue(task.due)}
                    </span>
                )}
                {task.estimatedDuration &&(
                    <span className="flex items-center gap-1">
                        <Clock size={12}/> {task.estimatedDuration} min
                    </span>
                )}
            </div>
        </div>
    )
}

export default TaskCard;