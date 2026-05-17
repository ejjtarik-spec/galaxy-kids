import {
    doc,
    getDoc,
    increment,
    setDoc,
    updateDoc,
  } from "firebase/firestore";
  
  import { db } from "./firestore";
  
  export async function completeEcoAction(
    userId: string,
    childId: string,
    xp: number,
    coins: number
  ) {
    const childRef = doc(
      db,
      "users",
      userId,
      "children",
      childId
    );
  
    await updateDoc(childRef, {
      xp: increment(xp),
      coins: increment(coins),
    });
  }
  
  export async function saveEcoAction(
    userId: string,
    childId: string,
    date: string,
    actionId: string
  ) {
    const ecoRef = doc(
      db,
      "users",
      userId,
      "children",
      childId,
      "ecoActions",
      date
    );
  
    const snap = await getDoc(ecoRef);
  
    let completedActions: string[] = [];
  
    if (snap.exists()) {
      completedActions = snap.data().completedActions || [];
    }
  
    if (!completedActions.includes(actionId)) {
      completedActions.push(actionId);
    }
  
    await setDoc(
      ecoRef,
      {
        completedActions,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  }
  
  export async function getEcoActions(
    userId: string,
    childId: string,
    date: string
  ): Promise<string[]> {
    const ecoRef = doc(
      db,
      "users",
      userId,
      "children",
      childId,
      "ecoActions",
      date
    );
  
    const snap = await getDoc(ecoRef);
  
    if (!snap.exists()) {
      return [];
    }
  
    return snap.data().completedActions || [];
  }