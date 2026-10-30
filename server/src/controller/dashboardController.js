import { asyncHandler } from "../utils/asyncHandler.js";

import Task from '../models/Task.js'

export const getDashboardStatus = asyncHandler(async(req,res)=>{
    const now = new Date();
    const startOfToday = new Date(now.setHours(0,0,0,0));

    const [total,completed,pending,inProgress,overdue] = await Promise.all([
        Task.countDocuments({}),
        Task.countDocuments({status:'completed'}),
        Task.countDocuments({status:'todo'}),
        Task.countDocuments({status:'in-progress'}),
        Task.countDocuments({status:{$ne:'completed'},dueDate:{$lt:startOfToday}})
    ]);

    const completionRate = total >0 ?Math.round((completed/total)*100):0;

    res.json({
        success:true,
        stats:{total,completed,pending,inProgress,completionRate,overdue}
    })
});

export const getRecentTasks = asyncHandler(async(req,res)=>{
    const tasks = await Task.find({}).sort({createdAt:-1}).limit(5);
    res.json({success:true,tasks});
});