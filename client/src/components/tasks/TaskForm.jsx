import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { taskSchema } from '../../utils/validators';
import Button from '../ui/Button';

function TaskForm({ initialData, onSubmit, onCancel, submitting }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: '', description: '', status: 'todo', priority: 'medium',
      dueDate: '', category: '', tags: '', estimatedDuration: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'todo',
        priority: initialData.priority || 'medium',
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : '',
        category: initialData.category || '',
        tags: (initialData.tags || []).join(', '),
        estimatedDuration: initialData.estimatedDuration ? String(initialData.estimatedDuration) : '',
      });
    }
  }, [initialData, reset]);

  function handleFormSubmit(data) {
    onSubmit({
      ...data,
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      estimatedDuration: data.estimatedDuration ? Number(data.estimatedDuration) : undefined,
      dueDate: data.dueDate ? new Date(data.dueDate).toISOString() : undefined,
    });
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
      <div>
        <label className="block text-xs text-ink-500 mb-1.5">Title *</label>
        <input {...register('title')} className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm" />
        {errors.title && <p className="text-xs text-danger mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-xs text-ink-500 mb-1.5">Description</label>
        <textarea {...register('description')} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-ink-500 mb-1.5">Status</label>
          <select {...register('status')} className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm">
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-ink-500 mb-1.5">Priority</label>
          <select {...register('priority')} className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-ink-500 mb-1.5">Due Date</label>
          <input type="date" {...register('dueDate')} className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm" />
        </div>
        <div>
          <label className="block text-xs text-ink-500 mb-1.5">Estimated Duration (min)</label>
          <input type="number" {...register('estimatedDuration')} className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-xs text-ink-500 mb-1.5">Category</label>
        <input {...register('category')} placeholder="e.g. Development" className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm" />
      </div>

      <div>
        <label className="block text-xs text-ink-500 mb-1.5">Tags (comma separated)</label>
        <input {...register('tags')} placeholder="e.g. bug, backend" className="w-full px-4 py-2.5 rounded-lg border border-ink-300/60 text-sm" />
      </div>

      <div className="flex gap-3 justify-end mt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
}

export default TaskForm;