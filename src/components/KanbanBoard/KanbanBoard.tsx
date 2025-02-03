import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Task, TaskStatus } from "@/types";
import { TaskList } from "@/components";
import { useMemo } from "react";
import { useTaskActions } from "@/store";

export interface KanbanBoardProps {
  tasks: Task[];
}

export function KanbanBoard(props: Readonly<KanbanBoardProps>) {
  const { tasks } = props;
  const { moveTask, addTask } = useTaskActions();

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const draggedTaskId = active.id.toString();
    const newStatus = over.id as TaskStatus;

    moveTask(draggedTaskId, newStatus);
  };

  const taskGroups = useMemo(() => {
    return tasks.reduce(
      (acc, task) => {
        acc[task.status].push(task);
        return acc;
      },
      { todo: [], "in-progress": [], done: [] } as Record<TaskStatus, Task[]>
    );
  }, [tasks]);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="w-full flex flex-col md:flex-row items-start gap-4 p-4">
        {(["todo", "in-progress", "done"] as TaskStatus[]).map((status) => (
          <TaskList
            key={status}
            variant={status}
            tasks={taskGroups[status]}
            onAddTask={addTask}
          />
        ))}
      </div>
    </DndContext>
  );
}
