export function isOverDue(task){
    if(!task.dueDate||task.status==='completed') return false;
    return new Date(task.dueDate) < new Date(new Date().setHours(0,0,0,0));
}

export function isDueToday(task){
    if(!task.dueDate) return false;
    const due = new Date(task.dueDate);
    const today = new Date();
    return due.toDateString()===today.toDateString();
}

export function formatDate(dateString){
    if(!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
} 

export function formatRelativeDue(dateString){
    if(!dateString) return '';
    const due = new Date(dateString);
    const today = new Date(new Date().setHours(0,0,0,0));
    const diffDays = Math.round((due.setHours(0,0,0,0)-today)/(1000*60*60));

    if(diffDays===0) return 'Due today';
    if(diffDays===1) return 'Due tomorrow';
    if(diffDays===-1) return 'Overdue by 1 day';
    if(diffDays<0) return `Overdue by ${Math.abs(diffDays)} days`;
    if(diffDays<=7) return `Due in ${diffDays} days`;
    return formatDate(dateString);
}