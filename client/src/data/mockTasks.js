const today = new Date();
function daysFromNow(n){
    const d = new Date(today);
    d.setDate(d.getDate()+n);
    return d.toISOString();
}

const mockTasks = [
    {id:'t1',title:'Design landing page wireframes',description:'Create low-fidelity wireframes for the new marketing site home page.',status:'todo',priority:'high',dueDate:daysFromNow(2),category:'Design',tags:['Wireframe','ui'],estimatedDuration:120,createdAt:daysFromNow(-5),completedAt:null},
    {id:'t2',title:'Fix login API bug',description:'Users report intermittent 401 errors after successful login.',status:'in-progress',priority:'high',dueDate:daysFromNow(-1),category:'Development',tags:['bug','backend'],estimatedDuration:90,createdAt:daysFromNow(-2),completedAt:null},
    {id:'t3',title:'Write Q3 report',description:'Compile sales and engagement data into the quarterly report',status:'todo',priority:'medium',dueDate:daysFromNow(5),category:'Admin',tags:['report'],estimatedDuration:180,createdAt:daysFromNow(-1),completedAt:null},
    {id:'t4',title:'Review pull requests',description:'Review and merge pending PRs from the team.',status:'in-progress',priority:'medium',dueDate:daysFromNow(0),category:'Development',tags:['review'],estimatedDuration:45,createdAt:daysFromNow(-1),completedAt:null},
    {id:'t5',title:'Update dependencies',description:'Bump outdated npm packages and test for the breaking changes.',status:'completed',priority:'low',dueDate:daysFromNow(-3),category:'Development',tags:['maintenance'],estimatedDuration:60,createdAt:daysFromNow(-7),completedAt:daysFromNow(-4)},
    {id:'t6',title:'Client onboarding call',description:'Walkthrough call with the new client to set expectations.',status:'completed',priority:'high',dueDate:daysFromNow(-5),category:'Admin',tags:['client'],estimatedDuration:30,createdAt:daysFromNow(-8),completedAt:daysFromNow(-5)},
    {id:'t7',title:'set up CI pipeline.',description:'Configure Github Actions for automated testing on push.',status:'todo',priority:'medium',dueDate:daysFromNow(7),category:'Development',tags:['devops'],estimatedDuration:150,createdAt:daysFromNow(-1),completedAt:null},
]


export default mockTasks;