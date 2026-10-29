import { useEffect,useState,useCallback } from "react";
import { TasksContext } from "./tasksContextStore";
import mockTasks from '../data/mockTasks';

const STORAGE_KEY = 'taskflow_mock_tasks';


function loadInitial(){
    try{
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw?JSON.parse(raw) : mockTasks;
    }catch{
        return mockTasks;
    }
}


export function TasksProvider({children}){
    const [tasks,setTasks] = useState(loadInitial);

    useEffect(()=>{
        localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks));
    },[tasks]);

    const addTask = useCallback((data)=>{
        const newTask={
            id:`t${Date.now()}`,
            ...data,
            createdAt:new Date().toISOString(),
            completedAt:data.status==='completed'?new Date().toISOString():null,
        };
        setTasks((prev)=>[newTask,...prev]);
        return newTask;
    },[]);

    const updateTask = useCallback((id,data)=>{
        setTasks((prev)=>
            prev.map((t)=>{
            if(t.id!==id) return t;
            const merged={...t,...data};
            if(data.status==='completed' && t.status!=='completed'){
                merged.completedAt=new Date().toISOString();
            }else if(data.status && data.status!=='completed'){
                merged.completedAt=null;
            }
            return merged;
        })
    );
},[]);

const updateStatus = useCallback((id,status)=>{
    setTasks((prev)=>prev.map((t)=>t.id===id?{...t,status,completedAt:status==='completed'?new Date().toISOString():null}:t))
},[]);

const deleteTask = useCallback((id)=>{
    setTasks((prev)=>prev.filter((t)=>t.id!==id));
},[]);

return (
    <TasksContext.Provider value={{tasks,loading:false,addTask,updateTask,updateStatus,deleteTask}} >
        {children}
    </TasksContext.Provider>
);
}