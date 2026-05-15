"use client";

import { useEffect, useState } from "react";
import { User } from "firebase/auth";

import { Task } from "../types";

import { createTask, completeTask } from "../services/firebase/tasks";
import { listenTasks } from "../services/firebase/listenTasks";

export function useTasks(user: User | null, selectedChildId: string | null) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!user || !selectedChildId) {
      setTasks([]);
      return;
    }

    setTasks([]);

    const unsubscribe = listenTasks(user.uid, selectedChildId, setTasks);

    return () => unsubscribe();
  }, [user, selectedChildId]);

  const addTask = async (title: string) => {
    if (!user || !selectedChildId || !title.trim()) return;

    await createTask(user.uid, selectedChildId, {
      title,
      xp: 20,
      coins: 10,
    });
  };

  const completeSelectedTask = async (task: Task) => {
    if (!user || !selectedChildId) return;

    await completeTask(user.uid, selectedChildId, task.id, task.xp, task.coins);
  };

  return {
    tasks,
    addTask,
    completeSelectedTask,
  };
}