"use client";
import { useState } from "react";

type Task = {
  id: number;
  groupTitle: string;
  text: string;
  completed: boolean;
};

export default function Todo() {
  // Mock data for now
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, groupTitle: "EECS2030", text: "Finish lab report", completed: false },
    { id: 2, groupTitle: "EECS2030", text: "Review lecture 3", completed: true },
    { id: 3, groupTitle: "EECS2021", text: "Read Chapter 2", completed: false },
  ]);

  // group tasks by groupTitle
  const grouped = tasks.reduce((acc, task) => {
    if (!acc[task.groupTitle]) acc[task.groupTitle] = [];
    acc[task.groupTitle].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  // toggle completed
  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">To-Do</h1>

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="mb-4">
          <h2 className="text-lg font-medium mb-2">{group}</h2>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                  className="h-4 w-4 rounded"
                />
                <span className={item.completed ? "line-through text-gray-400" : ""}>
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
