import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  category: "Personal" | "Work";
  completed: boolean;
}

interface TodoState {
  tasks: Task[];
  filter: "All" | "Personal" | "Work";
  addTask: (task: Omit<Task, "id" | "completed">) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
  setFilter: (filter: "All" | "Personal" | "Work") => void;
}

const useTodoStore = create<TodoState>()(
  persist(
    (set) => ({
      tasks: [],
      filter: "All",
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { ...task, id: Date.now(), completed: false },
          ],
        })),
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      setFilter: (filter) => set({ filter }),
    }),
    {
      name: "todo-storage",
    }
  )
);

export default useTodoStore;
