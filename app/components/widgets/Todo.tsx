"use client";
import { useState } from "react";

// task types
type Task = {
  id: number;
  groupId: number;
  text: string;
  completed: boolean;
};

type Group = {
  id: number;
  title: string;
};

export default function Todo() {
  const [groups, setGroups] = useState<Group[]>([
    { id: 1, title: "EECS2030" },
    { id: 2, title: "EECS2021" },
  ]);

  // Mock data for now
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, groupId: 1, text: "Finish lab report", completed: false },
    { id: 2, groupId: 1, text: "Review lecture 3", completed: true },
    { id: 3, groupId: 2, text: "Read Chapter 2", completed: false },
  ]);

  // toggle completed
  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const [editingId, setEditingId] = useState<number | null>(null); // to figure out which task is in edit mode
  const [tempText, setTempText] = useState(""); // temp text while typing
  const [newTextByGroup, setNewTextByGroup] = useState<Record<number, string>>(
    {}
  ); // holds the draft text for each group's "new task" input

  // editing group states
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [tempGroupTitle, setTempGroupTitle] = useState("");

  function startEditingGroup(id: number, currentText: string) {
    setEditingGroupId(id);
    setTempGroupTitle(currentText);
  }

  function saveGroupEdit(id: number) {
    // Save the edited group title
    setGroups((prev) =>
      // If the group's id matches the one we're saving, we create a new object with the updated title
      prev.map((g) => (g.id === id ? { ...g, title: tempGroupTitle } : g))
    );
    setEditingGroupId(null);
    setTempGroupTitle("");
  }

  // start editing when user clicks the text
  function startEditing(id: number, currentText: string) {
    setEditingId(id);
    setTempText(currentText);
  }

  // commit (save) the edit on Enter
  function saveEdit(id: number) {
    setTasks(
      (prev) => prev.map((t) => (t.id === id ? { ...t, text: tempText } : t)) // if task's id matches the one we are saving,
      // create a new object then copies all the other fields so they dont get lost
      // we override the text with the value in tempText (what the user typed)
    );
    setEditingId(null);
    setTempText("");
  }

  // cancel edit for task on Escape
  function cancelEdit() {
    setEditingId(null); // no task is being edited
    setTempText("");
  }

  // cancel edit for group on Escape
  function cancelGroupEdit() {
    setEditingGroupId(null);
    setTempGroupTitle("");
  }

  // helper function to add a task
  function addTask(groupId: number, text: string) {
    if (!text.trim()) return; // Don't add empty tasks
    setTasks((prev) => [
      ...prev, // keep existing tasks
      {
        id: Date.now(), // simple unique id (temp id for local UI)
        groupId,
        text: text.trim(),
        completed: false, // initial state is not completed
      },
    ]);
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-3">To-Do</h1>
      {groups.map((group) => {
        const items = tasks.filter((task) => task.groupId === group.id);

        return (
          <div key={group.id} className="mb-4">
            <h2 className="text-lg font-medium mb-2">
              {editingGroupId === group.id ? (
                <input
                  type="text"
                  value={tempGroupTitle}
                  autoFocus
                  onChange={e => setTempGroupTitle(e.target.value)}
                  onBlur={() => saveGroupEdit(group.id)} 
                  onKeyDown={e => {
                    if (e.key === "Enter") saveGroupEdit(group.id);
                    if (e.key === "Escape") cancelGroupEdit();
                  }}
                  className="border-b border-gray-300 bg-transparent focus:outline-none"
                />
              ) : (
                <span
                  onClick={() => startEditingGroup(group.id, group.title)}
                  className="cursor-pointer"
                  title="Click to edit"
                >
                  {group.title}
                </span>
              )}
            </h2>
            <ul className="space-y-2">
              {/* functionality for inline task editing */}
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleTask(item.id)}
                    className="h-4 w-4 rounded"
                  />
                  {editingId === item.id ? (
                    <input
                      type="text"
                      value={tempText}
                      autoFocus
                      onChange={(e) => setTempText(e.target.value)}
                      onBlur={() => saveEdit(item.id)} // save on blur
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(item.id);
                        if (e.key === "Escape") cancelEdit();
                      }}
                      className="border-b border-gray-300 bg-transparent focus:outline-none"
                    />
                  ) : (
                    <span
                      onClick={() => startEditing(item.id, item.text)}
                      className={
                        item.completed ? "line-through text-gray-400" : ""
                      }
                      title="Click to edit"
                    >
                      {item.text}
                    </span>
                  )}
                </li>
              ))}

              {/* input for adding new tasks */}
              <li className="flex items-center gap-2 opacity-60 hover:opacity-100">
                {/* spacer to align with checkbox column */}
                <span className="inline-block h-4 w-4 rounded border border-gray-300" />
                <input
                  type="text"
                  placeholder="Type to add..."
                  value={newTextByGroup[group.id] ?? ""}
                  onChange={(e) =>
                    setNewTextByGroup((prev) => ({
                      ...prev,
                      [group.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      addTask(group.id, newTextByGroup[group.id] ?? ""); // add task on Enter
                      setNewTextByGroup((prev) => ({
                        ...prev,
                        [group.id]: "",
                      })); // clear input after adding
                    }
                    if (e.key === "Escape")
                      setNewTextByGroup((prev) => ({
                        ...prev,
                        [group.id]: "",
                      })); // clear input on Escape
                  }}
                  className="border-b border-gray-300 bg-transparent focus:outline-none"
                />
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
