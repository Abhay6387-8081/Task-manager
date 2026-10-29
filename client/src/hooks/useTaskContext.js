import { useContext } from "react";
import { TasksContext } from "../context/tasksContextStore";

export function useTaskContext(){
    const ctx = useContext(TasksContext);
    if(!ctx) throw Error('useTasksContext must be used inside TasksProvider.')
        return ctx;
}