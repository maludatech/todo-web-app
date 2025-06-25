"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Plus, Check, Trash, Sun, Moon } from "lucide-react";
import useTodoStore from "@/store/useTodoStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { APP_NAME } from "@/lib/constants";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const { tasks, filter, addTask, toggleTask, deleteTask, setFilter } =
    useTodoStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<"Personal" | "Work">("Personal");

  const handleAddTask = () => {
    if (!title) {
      toast.error("Title is required");
    }
    if (!description) {
      toast.error("Description is required");
    }
    if (title.trim()) {
      addTask({ title, description, dueDate, category });
      setTitle("");
      setDescription("");
      setDueDate("");
      setCategory("Personal");
    }
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.category === filter);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Link href="/" className="text-3xl font-bold tracking-tight ">
          {APP_NAME}
        </Link>
        <Button
          variant="ghost"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle Theme"
          className="hover:cursor-pointer"
        >
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>

      {/* Add Task Form */}
      <Card className="p-6 mb-6 shadow-md">
        <CardContent className="p-0 space-y-4">
          <Input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Select
            value={category}
            onValueChange={(value) => setCategory(value as "Personal" | "Work")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Personal">Personal</SelectItem>
              <SelectItem value="Work">Work</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={handleAddTask}
            className="w-full hover:cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Task
          </Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex gap-2 justify-center mb-6">
        {(["All", "Personal", "Work"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            onClick={() => setFilter(f)}
            className="hover:cursor-pointer"
          >
            {f}
          </Button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-10">
            <Image
              src={
                theme === "dark"
                  ? "/assets/images/empty-icon-dark.png"
                  : "/assets/images/empty-icon.png"
              }
              width={200}
              height={200}
              alt="No tasks"
            />
            <p className="mt-4 text-muted-foreground text-sm">
              You have no tasks right now.
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <Card
              key={task.id}
              className="flex flex-row items-center justify-between gap-4 p-4"
            >
              <Button
                variant="ghost"
                onClick={() => toggleTask(task.id)}
                className="mt-1 hover:cursor-pointer"
                aria-label="Toggle Task Completion"
              >
                <Check
                  className={
                    task.completed ? "text-green-500" : "text-gray-400"
                  }
                />
              </Button>
              <div className="flex-1">
                <h3
                  className={`font-semibold text-lg ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-1">
                  {task.description}
                </p>
                <p className="text-xs text-gray-400">
                  Due: {task.dueDate || "No date"} | Category: {task.category}
                </p>
              </div>
              <Button
                variant="ghost"
                onClick={() => deleteTask(task.id)}
                aria-label="Delete Task"
                className="hover:cursor-pointer"
              >
                <Trash className="text-red-500" />
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
