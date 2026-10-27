import {Calendar} from 'lucide-react';
import {Link} from 'react-router-dom';
import { formatRelativeDue,isOverDue } from '../../utils/dateHelpers';
import { PriorityBadge } from '../ui/Badge';
import EmptyState from '../ui/EmptyState';

function UpcomingDeadlines({tasks}){
    const upcoming = tasks.filter((t)=>t.status!=='completed' && t.dueDate).sort((a,b)=>new Date(a.dueDate)-new Date(b.dueDate)).slice(0,5);

    if(upcoming.length === 0){
        return <EmptyState icon={Calendar} title='No upcoimg deadlines' subtitle='youre all caught up.'/>
    }


    return(
        <div className='flex flex-col gap-2'>
            {upcoming.map((task)=>(
                <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className='flex items-center justify-between p-3 rounded-lg border border-ink-300/30 hover:bg-surface-bg transition-colors'
                >
                <div>
                    <p className='text-sm font-medium text-ink-900 truncate'>{task.title}</p>
                    <p className={`text-sm mt-0.5 ${isOverDue(task)?'text-danger font-medium':'text-ink-500'}`}>{formatRelativeDue(task.dueDate)}</p>
                </div>
                <PriorityBadge priority={task.priority}/>
                </Link>
            ))}
        </div>
    )
}

export default UpcomingDeadlines;