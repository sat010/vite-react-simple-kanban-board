import { useDroppable } from "@dnd-kit/core";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Task } from "@/components";
import { TaskStatus, Task as TaskType } from "@/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";

export interface TaskListProps {
  tasks: TaskType[];
  variant: TaskStatus;
  onAddTask?(title: string, status: TaskStatus): void;
}

function getCnByVariant(variant: TaskStatus) {
  switch (variant) {
    case "todo":
      return { header: "bg-gray-300", container: "bg-gray-50" };
    case "in-progress":
      return { header: "bg-blue-500", container: "bg-blue-50" };
    case "done":
      return { header: "bg-green-600", container: "bg-green-50" };
  }
}

export function TaskList(props: Readonly<TaskListProps>) {
  const { tasks, variant, onAddTask } = props;
  const { setNodeRef } = useDroppable({ id: variant });
  const [showAdd, setShowAdd] = useState(false);
  const [showHeaderAdd, setShowHeaderAdd] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const headerInputRef = useRef<HTMLInputElement>(null);

  const hideInput = () => {
    setShowAdd(false);
    setShowHeaderAdd(false);
    setTaskTitle("");
  };

  const addTask = () => {
    if (taskTitle.trim() && onAddTask) {
      onAddTask(taskTitle, variant);
    }
    hideInput();
  };

  const blur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (!event.relatedTarget) {
      hideInput();
    }
  };

  return (
    <Card
      ref={setNodeRef}
      className={cn(
        "w-full flex-1 flex-grow p-1 border shadow-md",
        getCnByVariant(variant).container
      )}
    >
      <CardHeader className="p-1 w-full flex flex-row gap-2 items-center justify-between">
        <div className="flex flex-row gap-2 items-center">
          <div className={cn("p-2 rounded-md", getCnByVariant(variant).header)}>
            <h2 className="text-base capitalize">
              {variant.replace("-", " ")}
            </h2>
          </div>
          <span>{tasks.length}</span>
        </div>
        {variant === "todo" && (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowHeaderAdd(true)}
          >
            <Plus className="w-5 h-5" />
          </Button>
        )}
      </CardHeader>

      <CardContent className="p-1 flex flex-col gap-2 items-start">
        {showHeaderAdd && (
          <Input
            ref={headerInputRef}
            autoFocus
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            onBlur={blur}
            placeholder="Task title"
          />
        )}
        {tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </CardContent>
      {variant === "todo" && (
        <CardFooter className="p-1">
          {showAdd ? (
            <Input
              ref={inputRef}
              autoFocus
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTask()}
              onBlur={blur}
              placeholder="Task title"
            />
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowAdd(true)}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
