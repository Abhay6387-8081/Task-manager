import Topbar from '../components/layout/Topbar';
import KanbanBoard from '../components/tasks/KanbanBoard';

function KandanPage(){
    return(
        <>
        <Topbar title='Kandan Board'/>
        <div className='p-6'>
            <KanbanBoard/>
        </div>
        </>
    )
}

export default KandanPage;