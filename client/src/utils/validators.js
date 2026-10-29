import {z} from 'zod';

export const taskSchema = z.object({
    title:z.string().min(2,'Title must be at least 2 characters.'),
    description:z.string().optional(),
    status:z.enum(['todo','in-progress','completed']),
    priority:z.enum(['low','medium','high']),
    dueDate:z.string().optional(),
    category:z.string().optional(),
    tags:z.string().optional(),
    estimatedDuration:z.string().optional(),
})