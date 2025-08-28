"use client";
import { useState } from "react";
import { useTodos } from "@/lib/hooks/useTodos";

export default function Todo() {
  const {
    groups,
    tasks,
    isLoading,
    isOnline,
    addTask,
    addGroup,
    updateTask,
    updateGroup,
  } = useTodos();

  // toggle completed
  const toggleTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
    }
  };

  const [editingId, setEditingId] = useState<number | null>(null); // to figure out which task is in edit mode
  const [tempText, setTempText] = useState(""); // temp text while typing
  const [newTextByGroup, setNewTextByGroup] = useState<Record<number, string>>(
    {}
  ); // holds the draft text for each group's "new task" input

  // editing group states
  const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
  const [tempGroupTitle, setTempGroupTitle] = useState("");

  // state for new group input
  const [newGroupTitle, setNewGroupTitle] = useState("");

  function startEditingGroup(id: number, currentText: string) {
    setEditingGroupId(id);
    setTempGroupTitle(currentText);
  }

  function saveGroupEdit(id: number) {
    // Save the edited group title
    updateGroup(id, tempGroupTitle);
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
    updateTask(id, { text: tempText });
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

  // wrapper functions for the new group input
  function handleAddGroup() {
    addGroup(newGroupTitle);
    setNewGroupTitle("");
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">To-Do</h1>
        <div className="flex items-center gap-2">
          {!isOnline && (
            <span className="text-sm text-amber-600 bg-amber-100 px-2 py-1 rounded">
              Offline
            </span>
          )}
          {isLoading && (
            <span className="text-sm text-gray-500">Loading...</span>
          )}
        </div>
      </div>
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
                  onChange={(e) => setTempGroupTitle(e.target.value)}
                  onBlur={() => saveGroupEdit(group.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveGroupEdit(group.id);
                    if (e.key === "Escape") cancelGroupEdit();
                  }}
                  className="border-b border-gray-300 bg-transparent focus:outline-none"
                />
              ) : (
                <span
                  onClick={() => startEditingGroup(group.id, group.title)}
                  className={`cursor-pointer ${
                    group.isOptimistic ? "opacity-60" : ""
                  }`}
                  title="Click to edit"
                >
                  {group.title}
                  {group.isOptimistic && (
                    <span className="ml-1 text-xs text-gray-400">
                      syncing...
                    </span>
                  )}
                </span>
              )}
            </h2>
            <ul className="space-y-2">
              {/* functionality for inline task editing */}
              {items.map((item) => (
                <li
                  key={item.id}
                  className={`flex items-center gap-2 ${
                    item.isOptimistic ? "opacity-60" : ""
                  }`}
                >
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
                      {item.isOptimistic && (
                        <span className="ml-1 text-xs text-gray-400">
                          syncing...
                        </span>
                      )}
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

      <div className="mb-4">
        <input
          type="text"
          placeholder="New group title"
          value={newGroupTitle}
          onChange={(e) => setNewGroupTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddGroup();
            if (e.key === "Escape") setNewGroupTitle("");
          }}
          // ... styling
        />
      </div>
    </div>
  );
}
