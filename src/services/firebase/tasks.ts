import {
    addDoc,
    collection,
    doc,
    updateDoc,
    increment,
  } from "firebase/firestore";
  
  import { db } from "./firestore";
  
  export const createTask = async (
    parentId: string,
    childId: string,
    task: { title: string; xp: number; coins: number }
  ) => {
    return addDoc(
      collection(db, "users", parentId, "children", childId, "tasks"),
      {
        title: task.title,
        xp: task.xp,
        coins: task.coins,
        done: false,
        createdAt: new Date(),
      }
    );
  };
  
  export const completeTask = async (
    parentId: string,
    childId: string,
    taskId: string,
    xp: number,
    coins: number
  ) => {
    await updateDoc(
      doc(db, "users", parentId, "children", childId, "tasks", taskId),
      { done: true }
    );
  
    await updateDoc(doc(db, "users", parentId, "children", childId), {
      xp: increment(xp),
      coins: increment(coins),
    });
  };