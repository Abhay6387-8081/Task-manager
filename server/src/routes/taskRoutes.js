import express from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask, updateTaskStatus } from '../controller/taskController.js';

const router = express.Router();

router.get('/',getTasks)
router.get('/:id',getTaskById);
router.post('/',createTask);
router.put('/:id',updateTask);
router.patch('/:id/status',updateTaskStatus);
router.delete('/:id',deleteTask);

export default router;