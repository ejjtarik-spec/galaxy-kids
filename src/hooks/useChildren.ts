"use client";

import { useEffect, useState } from "react";
import { User } from "firebase/auth";

import { Child } from "../types";
import { avatars } from "../constants/avatars";

import { createChild } from "../services/firebase/children";
import { deleteChild } from "../services/firebase/deleteChild";
import { listenChildren } from "../services/firebase/listenChildren";

const SELECTED_CHILD_STORAGE_KEY = "galaxy-kids-selected-child-id";

export function useChildren(user: User | null) {
  const [children, setChildren] = useState<Child[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const selectedChild =
    children.find((child) => child.id === selectedChildId) || null;

  useEffect(() => {
    if (!user) {
      setChildren([]);
      setSelectedChildId(null);
      return;
    }

    const savedChildId = localStorage.getItem(SELECTED_CHILD_STORAGE_KEY);

    if (savedChildId) {
      setSelectedChildId(savedChildId);
    }

    const unsubscribe = listenChildren(user.uid, setChildren);

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!selectedChildId) return;

    localStorage.setItem(SELECTED_CHILD_STORAGE_KEY, selectedChildId);
  }, [selectedChildId]);

  const addChild = async (name: string, age: number) => {
    if (!user || !name.trim()) return;

    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    await createChild(user.uid, {
      name,
      age,
      avatar: randomAvatar,
      xp: 0,
      coins: 0,
      streak: 0,
      lastBonusDate: "",
    });
  };

  const removeChild = async (childId: string) => {
    if (!user) return;

    await deleteChild(user.uid, childId);

    if (selectedChildId === childId) {
      setSelectedChildId(null);
      localStorage.removeItem(SELECTED_CHILD_STORAGE_KEY);
    }
  };

  const selectChild = (childId: string) => {
    setSelectedChildId(childId);
    localStorage.setItem(SELECTED_CHILD_STORAGE_KEY, childId);
  };

  return {
    children,
    selectedChild,
    selectedChildId,
    setSelectedChildId,
    addChild,
    removeChild,
    selectChild,
  };
}