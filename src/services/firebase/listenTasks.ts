import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firestore";

export const listenTasks = (
  parentId: string,
  childId: string,
  callback: (tasks: any[]) => void
) => {
  return onSnapshot(
    collection(db, "users", parentId, "children", childId, "tasks"),
    (snapshot) => {
      callback(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    }
  );
};