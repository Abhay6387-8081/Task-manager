import { useState, useEffect } from 'react';
import { DndContext, closestCorners, PointerSensor, KeyboardSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates, arrayMove } from '@dnd-kit/sortable';
import KanbanColumn from './KandanColumn'
import { useTaskContext } from '../../hooks/useTaskContext';
import { useToast } from '../../hooks/useToast';

const COLUMN_IDS = ['todo', 'in-progress', 'completed'];
const COLUMN_LABELS = { todo: 'To Do', 'in-progress': 'In Progress', completed: 'Completed' };

function groupByStatus(tasks) {
  const grouped = { todo: [], 'in-progress': [], completed: [] };
  tasks.forEach((t) => {
    if (grouped[t.status]) grouped[t.status].push(t);
  });
  return grouped;
}

function KanbanBoard() {
  const { tasks, updateStatus } = useTaskContext();
  const { show } = useToast();
  const [columns, setColumns] = useState(() => groupByStatus(tasks));

  // Re-sync whenever the underlying task list changes elsewhere in the app
  // (created/edited/deleted from the list view, for example).
  useEffect(() => {
    setColumns(groupByStatus(tasks));
  }, [tasks]);

  // distance: 8 lets a plain click on a card's title-link register as a
  // click (navigating to task details) rather than starting a drag.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function findContainer(id) {
    if (COLUMN_IDS.includes(id)) return id;
    return COLUMN_IDS.find((col) => columns[col].some((t) => t.id === id));
  }

  function handleDragOver(event) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);
    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setColumns((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const movedTask = activeItems.find((t) => t.id === active.id);

      return {
        ...prev,
        [activeContainer]: activeItems.filter((t) => t.id !== active.id),
        [overContainer]: [...overItems, movedTask],
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over.id);
    if (!activeContainer || !overContainer) return;

    if (activeContainer === overContainer) {
      const items = columns[activeContainer];
      const oldIndex = items.findIndex((t) => t.id === active.id);
      const newIndex = items.findIndex((t) => t.id === over.id);
      if (oldIndex !== newIndex && newIndex !== -1) {
        setColumns((prev) => ({ ...prev, [activeContainer]: arrayMove(items, oldIndex, newIndex) }));
      }
      return;
    }

    // Dropped into a different column — persist the status change.
    updateStatus(active.id, overContainer);
    show(`Task moved to ${COLUMN_LABELS[overContainer]}`);
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {COLUMN_IDS.map((colId) => (
          <KanbanColumn key={colId} id={colId} tasks={columns[colId]} />
        ))}
      </div>
    </DndContext>
  );
}

export default KanbanBoard;  