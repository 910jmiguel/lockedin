import { useState, useEffect, useCallback, useRef } from "react";
import { authClient } from "@/lib/auth-client";

// Types matching your component
type Task = {
  id: number;
  groupId: number;
  text: string;
  completed: boolean;
  isOptimistic?: boolean; // Track optimistic updates
  originalId?: string; // For offline items
};

type Group = {
  id: number;
  title: string;
  isOptimistic?: boolean;
};

type TodoItem = {
  id: number;
  userId: number;
  groupTitle: string;
  text: string;
  completed: boolean;
  createdAt: string;
};

// Queue for offline operations
type OfflineOperation = {
  id: string;
  type: "create" | "update" | "delete";
  data: any;
  timestamp: number;
};

export function useTodos() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const offlineQueueRef = useRef<OfflineOperation[]>([]);
  const syncTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineOperations();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Fetch todos from server
  const fetchTodos = useCallback(async () => {
    try {
      const response = await fetch("/api/todos", {
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch todos");

      const data = await response.json();
      const serverTodos: TodoItem[] = data.todos;

      // Transform server data to client format
      const groupMap = new Map<string, Group>();
      const taskList: Task[] = [];
      let groupIdCounter = 1;
      let taskIdCounter = 1;

      serverTodos.forEach((todo) => {
        // Create group if it doesn't exist
        if (!groupMap.has(todo.groupTitle)) {
          groupMap.set(todo.groupTitle, {
            id: groupIdCounter++,
            title: todo.groupTitle,
          });
        }

        const group = groupMap.get(todo.groupTitle)!;
        taskList.push({
          id: taskIdCounter++,
          groupId: group.id,
          text: todo.text,
          completed: todo.completed,
        });
      });

      setGroups(Array.from(groupMap.values()));
      setTasks(taskList);
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Execute API operation
  const executeOperation = useCallback(async (operation: OfflineOperation) => {
    try {
      switch (operation.type) {
        case "create":
          await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(operation.data),
          });
          break;

        case "update":
          await fetch(`/api/todos/${operation.data.serverId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(operation.data.updates),
          });
          break;

        case "delete":
          await fetch(`/api/todos/${operation.data.serverId}`, {
            method: "DELETE",
            credentials: "include",
          });
          break;
      }

      // Remove optimistic flag after successful sync
      if (operation.type === "create") {
        setTasks(prev => prev.map(task => 
          task.originalId === operation.id 
            ? { ...task, isOptimistic: false }
            : task
        ));
      }
    } catch (error) {
      console.error("Failed to execute operation:", error);
      // Re-add to queue if failed
      offlineQueueRef.current.push(operation);
    }
  }, []);

  // Debounced sync function
  const debouncedSync = useCallback((operation: OfflineOperation) => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }
    syncTimeoutRef.current = setTimeout(() => {
      if (isOnline) {
        executeOperation(operation);
      } else {
        offlineQueueRef.current.push(operation);
      }
    }, 500); // 500ms debounce for real-time typing
  }, [isOnline, executeOperation]);

  // Sync offline operations when coming back online
  const syncOfflineOperations = async () => {
    const operations = [...offlineQueueRef.current];
    offlineQueueRef.current = [];

    for (const operation of operations) {
      await executeOperation(operation);
    }
  };

  // Add task with optimistic update
  const addTask = useCallback((groupId: number, text: string) => {
    if (!text.trim()) return;

    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    const optimisticTask: Task = {
      id: Date.now(),
      groupId,
      text: text.trim(),
      completed: false,
      isOptimistic: true,
      originalId: `temp-${Date.now()}`,
    };

    // Optimistic update
    setTasks(prev => [...prev, optimisticTask]);

    // Queue operation
    const operation: OfflineOperation = {
      id: optimisticTask.originalId!,
      type: "create",
      data: {
        groupTitle: group.title,
        text: text.trim(),
        completed: false,
      },
      timestamp: Date.now(),
    };

    debouncedSync(operation);
  }, [groups, debouncedSync]);

  // Add group with optimistic update
  const addGroup = useCallback((title: string) => {
    if (!title.trim()) return;

    const optimisticGroup: Group = {
      id: Date.now(),
      title: title.trim(),
      isOptimistic: true,
    };

    setGroups(prev => [...prev, optimisticGroup]);

    // Groups are created implicitly when first task is added
    // So we don't need to sync empty groups
  }, []);

  // Update task with optimistic update
  const updateTask = useCallback((taskId: number, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, ...updates }
        : task
    ));

    // Find the task and group for server sync
    const task = tasks.find(t => t.id === taskId);
    const group = groups.find(g => g.id === task?.groupId);
    
    if (task && group) {
      const operation: OfflineOperation = {
        id: `update-${Date.now()}`,
        type: "update",
        data: {
          serverId: task.id, // This would be the server ID in real implementation
          updates,
        },
        timestamp: Date.now(),
      };

      debouncedSync(operation);
    }
  }, [tasks, groups, debouncedSync]);

  // Update group title
  const updateGroup = useCallback((groupId: number, title: string) => {
    setGroups(prev => prev.map(group => 
      group.id === groupId 
        ? { ...group, title: title.trim() }
        : group
    ));

    // Update all tasks in this group
    setTasks(prev => prev.map(task => {
      if (task.groupId === groupId) {
        const operation: OfflineOperation = {
          id: `update-group-${Date.now()}`,
          type: "update",
          data: {
            serverId: task.id,
            updates: { groupTitle: title.trim() },
          },
          timestamp: Date.now(),
        };
        debouncedSync(operation);
      }
      return task;
    }));
  }, [debouncedSync]);

  return {
    groups,
    tasks,
    isLoading,
    isOnline,
    addTask,
    addGroup,
    updateTask,
    updateGroup,
    setGroups,
    setTasks,
  };
}
