import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firestore";

export const listenChildren = (
  parentId: string,
  callback: (children: any[]) => void
) => {
  return onSnapshot(
    collection(db, "users", parentId, "children"),
    (snapshot) => {
      const children = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(children);
    }
  );
};