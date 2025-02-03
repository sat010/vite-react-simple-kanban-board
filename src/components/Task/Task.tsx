import { Task as TaskType } from "@/types";
import { useDraggable } from "@dnd-kit/core";
import { Card, CardTitle } from "@/components/ui/card";

export interface TaskProps {
  task: TaskType;
}

export function Task(props: Readonly<TaskProps>) {
  const { task } = props;
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className="w-full p-2 bg-white shadow-sm rounded-md border cursor-pointer"
      style={style}
    >
      <CardTitle className="break-all text-sm text-start">
        {task.title}
      </CardTitle>
    </Card>
  );
}
