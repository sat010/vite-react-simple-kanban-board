import { Plus } from "lucide-react";
import { useState } from "react";

import { Task, TaskInput } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Task as TaskType, TaskStatus } from "@/types";
import { useDroppable } from "@dnd-kit/core";

export interface TaskListProps {
  tasks: TaskType[];
  variant: TaskStatus;
  onAddTask?(title: string, status: TaskStatus): void;
}

const variantStyles: Record<
  TaskStatus,
  { headerBadge: string; container: string }
> = {
  todo: { headerBadge: "bg-gray-300", container: "bg-gray-50" },
  "in-progress": { headerBadge: "bg-blue-500", container: "bg-blue-50" },
  done: { headerBadge: "bg-green-600", container: "bg-green-50" },
};

export function TaskList(props: Readonly<TaskListProps>) {
  const { tasks, variant, onAddTask } = props;
  const { setNodeRef } = useDroppable({ id: variant });
  const [taskTitle, setTaskTitle] = useState("");
  const [inputType, setInputType] = useState<"none" | "header" | "footer">(
    "none"
  );

  const hideInput = () => {
    setInputType("none");
    setTaskTitle("");
  };

  const addTask = () => {
    if (taskTitle.trim() && onAddTask) {
      onAddTask(taskTitle, variant);
    }
    hideInput();
  };

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        "w-full flex-1 flex-grow p-1 border shadow-md",
        variantStyles[variant].container
      )}
    >
      <CardHeader className="p-1 w-full flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div
            className={cn("p-2 rounded-md", variantStyles[variant].headerBadge)}
          >
            <h2 className="text-base capitalize">
              {variant.replace("-", " ")}
            </h2>
          </div>
          <span>{tasks.length}</span>
        </div>
        {variant === "todo" && inputType !== "header" && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setInputType("header")}
          >
            <Plus className="w-5 h-5" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-1 flex flex-col gap-2 items-start">
        {inputType === "header" && (
          <TaskInput
            value={taskTitle}
            onChange={setTaskTitle}
            onSubmit={addTask}
            onCancel={hideInput}
          />
        )}
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </CardContent>

      {variant === "todo" && (
        <CardFooter className="p-1">
          {inputType === "footer" ? (
            <TaskInput
              value={taskTitle}
              onChange={setTaskTitle}
              onSubmit={addTask}
              onCancel={hideInput}
            />
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setInputType("footer")}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
