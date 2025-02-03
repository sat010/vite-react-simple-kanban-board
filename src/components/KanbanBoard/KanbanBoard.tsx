import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
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
    if (!over) return;

    const draggedTaskId = active.id.toString();
    const newStatus = over.id as TaskStatus;

    moveTask(draggedTaskId, newStatus);
  };

  const todoTask = useMemo(
    () => tasks.filter((t) => t.status === "todo"),
    [tasks]
  );
  const inProgressTask = useMemo(
    () => tasks.filter((t) => t.status === "in-progress"),
    [tasks]
  );
  const doneTask = useMemo(
    () => tasks.filter((t) => t.status === "done"),
    [tasks]
  );

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="w-full flex flex-col md:flex-row items-start gap-4 p-4">
        <SortableContext
          items={todoTask}
          strategy={verticalListSortingStrategy}
        >
          <TaskList variant={"todo"} tasks={todoTask} onAddTask={addTask} />
        </SortableContext>
        <SortableContext
          items={inProgressTask}
          strategy={verticalListSortingStrategy}
        >
          <TaskList
            variant={"in-progress"}
            tasks={inProgressTask}
            onAddTask={addTask}
          />
        </SortableContext>
        <SortableContext
          items={doneTask}
          strategy={verticalListSortingStrategy}
        >
          <TaskList variant={"done"} tasks={doneTask} onAddTask={addTask} />
        </SortableContext>
      </div>
    </DndContext>
  );
}
