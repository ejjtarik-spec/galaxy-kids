"use client";

import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase/auth";
import { createUserIfNotExists } from "../services/firebase/firestore";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        await createUserIfNotExists(currentUser);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    authLoading,
  };
}