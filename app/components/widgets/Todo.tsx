"use client";
import { useState } from "react";

// task types
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

  const [editingId, setEditingId] = useState<number | null>(null); // to figure out which task is in edit mode
  const [tempText, setTempText] = useState(""); // temp text while typing
  const [newTextByGroup, setNewTextByGroup] = useState<Record<string, string>>({}); // holds the draft text for each group's "new task" input

  // start editing when user clicks the text
  function startEditing(id: number, currentText: string) {
    setEditingId(id);
    setTempText(currentText);
  }

  // commit (save) the edit on Enter
  function saveEdit(id: number) {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, text: tempText } : t)) // if task's id matches the one we are saving,
      // create a new object then copies all the other fields so they dont get lost
      // we override the text with the value in tempText (what the user typed)
    );
    setEditingId(null);
    setTempText("");
  }

  // cancel edit on Escape
  function cancelEdit() {
    setEditingId(null); // no task is being edited
    setTempText("");
  }

  // helper function to add a task
  function addTask(groupTitle: string) {
    const draft = (newTextByGroup[groupTitle] || "").trim();
    if(!draft) return; // do nothing if empty

    setTasks(prev => [
      ...prev, // keep existing tasks
      {
        id: Date.now(), // simple unique id (temp id for local UI)
        groupTitle,
        text: draft, // the task text
        completed: false // initial state is not completed
      },
    ]);
    setNewTextByGroup(prev => ({ ...prev, [groupTitle]: "" })); // clear the input field
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">To-Do</h1>

      {Object.entries(grouped).map(([group, items]) => (
        <div key={group} className="mb-4">
          <h2 className="text-lg font-medium mb-2">{group}</h2>
          <ul className="space-y-2">

            {/* functionality for inline task editing */}
            {items.map(item => (
              <li key={item.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item.id)}
                  className="h-4 w-4 rounded"
                />
                <span>
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={tempText}
                      autoFocus
                      onChange={(e) => setTempText(e.target.value)}
                      onBlur={() => saveEdit(item.id)} // save on blur
                      onKeyDown={(e) => {
                        if(e.key === "Enter") saveEdit(item.id);
                        if(e.key === "Escape") cancelEdit();
                      }}
                      className="border-b border-gray-300 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <span 
                      onClick={() => startEditing(item.id, item.text)}
                      className={item.completed ? "line-through text-gray-400" : ""}
                      title="Click to edit"
                    >
                      {item.text}
                    </span>
                  )}
                </span>
              </li>
            ))}
            {/* input for adding new tasks */}
            <li className="flex items-center gap-2 opacity-60 hover:opacity-100">
              {/* spacer to align with checkbox column */}
              <span className="inline-block h-4 w-4 rounded border border-gray-300" />

              <input 
                type="text"
                placeholder="Type to add..."
                value={newTextByGroup[group] ?? ""}
                onChange={(e) => setNewTextByGroup(prev => ({ ...prev, [group]: e.target.value }))}
                {/*not done here yet*/}
              />
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
