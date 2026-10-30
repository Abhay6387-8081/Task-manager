import { asyncHandler } from "../utils/asyncHandler.js";

export const getTasks = asyncHandler(async (req, res) => {
  const {
    status,
    priority,
    category,
    search,
    sort,
    page = 1,
    limit = 20,
  } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (category) filter.category = category;
  if (search) filter.$text = { $search: search };

  let sortOption = { dueDate: 1 };
  if (sort === "priority") sortOption = { priority: 1 };
  else if (sort === "createdAt") sortOption = { createdAt: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const [tasks, total] = await Promise.all([
    Task.find(filter).sort(sortOption).skip(skip).limit(Number(limit)),
    Task.countDocuments(filter),
  ]);

  res.json({
    success: true,
    tasks,
    pagination: {
      total,
      page: Number(page),
      pages: math.ceil(total / Number(limit)),
    },
  });
});

export const getTaskById = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if(!task){
      res.status(404);
      throw new Error('Task not found.')
    }
    res.json({success:true,task})
});

export const createTask = asyncHandler(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({success:true,task})
});

export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
  if(!task){
    res.status(404);
    throw new Error('Task not found.')
  }
  res.json({success:true,task})
});

export const updateTaskStatus=asyncHandler(async(req,res)=>{
  const {status} = req.body;
  const validStatuses = ['todo','in-progress','completed'];

  if(!validStatuses.includes(status)){
    res.status(400);
    throw new Error('Invalid status.');
  }

  const update = {status}
  update.completedAt = status === 'completed'?new Date():null;

  const task = await Task.findByIdAndUpdate(req.params.id,update,{new:true});
  if(!task){
    res.status(404);
    throw new Error('Task not found.')
  }
  res.json({success:true,task});
})

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.param.id);
  if(!task){
    res.status(404);
    throw new Error('Task not found.')
  }
  res.json({success:true,message:'Task deleted.'})
});
