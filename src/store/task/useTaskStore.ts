import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Task, TaskStatus } from "@/types";
import { nanoid } from "nanoid";

interface TaskState {
  tasks: Task[];
  actions: {
    addTask: (title: string, status: TaskStatus) => void;
    moveTask: (id: string, status: TaskStatus) => void;
  };
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set) => ({
      tasks: [],
      actions: {
        addTask: (title, status) =>
          set((state) => ({
            tasks: [...state.tasks, { id: nanoid(), title, status }],
          })),
        moveTask: (id, status) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, status } : task
            ),
          })),
      },
    }),
    {
      name: "tasks-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const action = Object.fromEntries(
          Object.entries(state).filter(([key]) => !["actions"].includes(key))
        );
        return action;
      },
    }
  )
);

export const useTask = () => useTaskStore((state) => state.tasks);
export const useTaskActions = () => useTaskStore((state) => state.actions);
