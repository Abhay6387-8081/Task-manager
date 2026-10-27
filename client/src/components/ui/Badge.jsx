const STATUS_CONFIG={
    todo:{label:'to Do',bg:'bg-status-todo/10',text:'text-status-todo'},
    'in-progress':{label:'In Progress',bg:'bg-status-progress/10',text:'text-status-progress'},
    completed:{label:'Completed',bg:'bg-status-completed/10',text:'text-status-completed'},
};

const PRIORITY_CONFIG={
    low:{label:'Low',bg:'bg-priority-low/10',text:'text-priority-low'},
    medium:{label:'Medium',bg:'bg-priority-medium/10',text:'text-priority-medium'},
    high:{label:'High',bg:'bg-priority-high/10',text:'text-priority-high'},
};

export function StatusBadge({status}){
    const c = STATUS_CONFIG[status] || STATUS_CONFIG.todo;
    return(
        <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${c.bg} ${c.text}`}>
            {c.label}
        </span>
    )
}

export function PriorityBadge({priority}){
    const c = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium;
    return(
        <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${c.bg} ${c.text}`}>
            {c.label} Priority
        </span>
    )
}